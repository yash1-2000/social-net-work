const express = require("express");
const Profile = require("../../model/Profile");
const User = require("../../model/User");
const Post = require("../../model/Post");
const auth = require("../../middleware/Auth");
const config = require("config");
const normalize = require("normalize-url");
const { body, validationResult } = require("express-validator");
const axios = require("axios");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Duri = require("../../datauri");
// const { uploader, cloudinaryConfig } = require("../../config/cloudinary");
const { cloudinary } = require("../../config/cloudinary");

const router = express.Router();
// =================================================================multer=======================================================================

const storage = multer.memoryStorage();

const uploads = multer({
  storage,
  limits: {
    fileSize: 1000000,
  },
  fileFilter: function (req, files, cb) {
    checkfiletype(files, cb);
  },
}).any();

function checkfiletype(files, cb) {
  const filetypes = /jpeg|jpg|png/;

  const extname = filetypes.test(
    path.extname(files.originalname).toLowerCase()
  );
  const mimetype = filetypes.test(files.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb({ message: "images only" });
  }
}
// ===============================================================multer==================================================================
// add profile pic
// router.post("/upload", auth, cloudinaryConfig, (req, res) => {
router.post("/upload", auth, (req, res) => {
  uploads(req, res, (err) => {
    if (err) {
      res.send(err.message);
    } else {
      if (req.files == undefined) {
        res.send("please select file");
      } else {
        try {
          // Buffer.isBuffer(req.files[0].buffer)
          //  console.log(Duri(req.files[0]))
          const Uri = Duri(req.files[0]);
          cloudinary.uploader.upload(
            Uri,
            { public_id: req.files[0].fieldname.toString(), overwrite: true },
            async (err, result) => {
              if (err) {
                res.send(err);
              }
              try {
                let profile = await Profile.findOne({ user: req.user.id });

                if (profile) {
                  profile = await Profile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: { profilepic: result.secure_url } },
                    { new: true }
                  );
                  // console.log(profile);
                  return res.send(profile);
                }
                res.send("profile not find");
              } catch (error) {
                res.send(error);
              }
            }
          );
        } catch (error) {
          res.send(error);
        }
      }
    }
  });
});

// remove profile pic
router.delete("/upload", auth, async (req, res) => {
  console.log(req.user.id);
  // let profile = Profile.findOne({ user: user });
  await Profile.findOneAndUpdate(
    { user: req.user.id },
    { $set: { profilepic: "" } },
    { new: true }
  )
    .then(() => {
      res.send("profile  pic deleted");
    })
    .catch((err) => res.send(err));
});
// @route   GET api/profile/me
// @desc    get current users profile
// @access  private

router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res.status(400).json({ msg: "there is no profile for this user" });
    }
    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

// @route   POST api/profile
// @desc    create or update users profile
// @access  private

router.post(
  "/",
  [
    auth,
    [
      body("profession", "profession is required").not().isEmpty(),
      body("skills", "skills are required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      company,
      website,
      location,
      bio,
      profession,
      githubusername,
      skills,
      youtube,
      twitter,
      facebook,
      linkedin,
      instagram,
    } = req.body;

    // profile object
    // const profileFields = {};
    // profileFields.user = req.user.id;
    // if (company) profileFields.company = company;
    // if (website) profileFields.website = website;
    // if (location) profileFields.location = location;
    // if (bio) profileFields.bio = bio;
    // if (profession) profileFields.profession = profession;
    // if (githubusername) profileFields.githubusername = githubusername;
    const profileFields = {
      user: req.user.id,
      company,
      location,
      website:
        website && website !== ""
          ? normalize(website, { forceHttps: true })
          : "",
      bio,
      skills: Array.isArray(skills)
        ? skills
        : skills.split(",").map((skill) => " " + skill.trim()),
      profession,
      githubusername,
    };

    if (skills)
      profileFields.skills = skills.split(",").map((skill) => skill.trim());

    // social object
    // profileFields.social = {};
    // if (youtube) profileFields.social.youtube = youtube;
    // if (twitter) profileFields.social.twitter = twitter;
    // if (facebook) profileFields.social.facebook = facebook;
    // if (linkedin) profileFields.social.linkedin = linkedin;
    // if (instagram) profileFields.social.instagram = instagram;

    // Build socialFields object
    const socialFields = { youtube, twitter, instagram, linkedin, facebook };

    for (const [key, value] of Object.entries(socialFields)) {
      if (value && value.length > 0)
        socialFields[key] = normalize(value, { forceHttps: true });
    }

    profileFields.social = socialFields;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        // console.log(profile);
        return res.send(profile);
      }
      profile = new Profile(profileFields);
      await profile.save();
      res.send(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

// @route   GET api/profile
// @desc    get all profiles
// @access  public

router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// @route   GET api/profile/user/:user_id
// @desc    get profile by id
// @access  public

router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      return res.status(400).json({ msg: "no profile for this user" });
    }
    res.json(profile);
  } catch (err) {
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "no profile for this user" });
    }
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// @route   DELEE api/profile
// @desc    DELETE profile, posts and user
// @access  private

router.delete("/:profileid", auth, async (req, res) => {
  try {
    // delete posts
    await Post.deleteMany({ user: req.user.id });
    // delete profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // delete user
    await User.findOneAndRemove({ _id: req.user.id });

    await cloudinary.uploader.destroy(req.params.profileid.toString());
    res.json({ msg: "user deleted" });
  } catch (err) {
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "no profile for this user" });
    }
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// @route   PUT api/profile
// @desc    add profile experiance
// @access  private

router.put(
  "/experiance",
  [
    auth,
    [
      body("title", "title is required").not().isEmpty(),
      body("company", "company are required").not().isEmpty(),
      body("from", "from are required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body;

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.experiences.unshift(newExp);
      await profile.save();
      res.json(profile);
    } catch (err) {
      if (err.kind == "ObjectId") {
        return res.status(400).json({ msg: "no profile for this user" });
      }
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

// @route    DELETE api/profile
// @desc    remove experiance
// @access  private

router.delete("/experiance/:exp_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    const RemoveIdx = profile.experiences
      .map((item) => item.id)
      .indexOf(req.params.exp_id);
    profile.experiences.splice(RemoveIdx, 1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "no profile for this user" });
    }
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// @route   PUT api/profile
// @desc    add profile education
// @access  private

router.put(
  "/education",
  [
    auth,
    [
      body("from", "from are required").not().isEmpty(),
      body("school", "school is required").not().isEmpty(),
      body("degree", "degree is required").not().isEmpty(),
      body("feildofstudy", "fieldofstudy is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      school,
      degree,
      feildofstudy,
      from,
      to,
      current,
      description,
    } = req.body;

    const newEdu = {
      school,
      degree,
      feildofstudy,
      from,
      to,
      current,
      description,
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.education.unshift(newEdu);
      await profile.save();
      res.json(profile);
    } catch (err) {
      if (err.kind == "ObjectId") {
        return res.status(400).json({ msg: "no profile for this user" });
      }
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

// @route    DELETE api/profile
// @desc    remove education
// @access  private

router.delete("/education/:edu_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    const RemoveIdx = profile.experiences
      .map((item) => item.id)
      .indexOf(req.params.exp_id);
    profile.education.splice(RemoveIdx, 1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "no profile for this user" });
    }
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// @route   GET api/profile/github/:username
// @desc    GET user github repos
// @access  public
router.get("/github/:username", async (req, res) => {
  try {
    const uri = encodeURI(
      `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
    );
    const headers = {
      "user-agent": "node.js",
      Authorization: `token ${config.get("githubToken")}`,
    };
    const gitHubResponse = await axios.get(uri, { headers });
    return res.json(gitHubResponse.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
