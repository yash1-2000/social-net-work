const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const config = require("config");
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/Auth");
const User = require("../../model/User");

// @route   GET api/auth
// @desc    test route
// @access public

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.send(user);
    // res.send('auth...')
  } catch (err) {
    console.log(err.message);
    res.send("server error");
  }
});

// @route   POST api/auth
// @desc    Authenticate user and get token
// @access public

router.post(
  "/",
  [
    body("email", "Please enter valid email").isEmail(),
    body("password", "password required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      // see if user exists
      let user = await User.findOne({ email });

      if (!user) {
        return (
          res
            .status(400)
            // .json({ errors: [{ msg: "invalid credentials" }] });
            .json({ msg: "invalid credentials" })
        );
      }

      // match password
      const IsMatch = await bcrypt.compare(password, user.password);

      if (!IsMatch) {
        return res.status(400).json({ msg: "invalid credentials" });
      }
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
