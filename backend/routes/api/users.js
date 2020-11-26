const express = require("express");
const router = express.Router();
const config = require("config");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("../../model/User");
var gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
// const { hash } = require("bcryptjs");

// @route    POST api/users
// @desc     register user
// @access   Public

router.get("/", (req, res) => {
  res.send("users...");
});

router.post(
  "/",
  [
    body("name", "Name is required").not().isEmpty(),
    body("email", "Please enter valid email").isEmail(),
    body("password", "length must be greater than 6").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    try {
      // see if user exists
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "user already exists" }] });
      }
      // get gravatar
      const avatar = await gravatar.url(email, { s: "200", r: "pg", d: "mm" });

      user = new User({
        name,
        email,
        avatar,
        password,
      });

      // encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      // get json webtoken
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).json("server error");
    }
  }
);

module.exports = router;
