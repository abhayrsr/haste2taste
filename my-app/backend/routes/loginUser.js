const express = require("express");
const router = express.Router();
const user = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const jwtSecret = "mynajjsioewkfnwhjofjoeijoif";

router.post("/loginuser", async (req, res) => {
  let email = req.body.email;
  try {
    let userData = await user.findOne({ email });
    if (!userData) {
      return res.status(400).json({ errors: "Try logging with correct email" });
    }

    const pwdCompare = await bcrypt.compare(
      req.body.password,
      userData.password
    );

    if (!pwdCompare) {
      return res.status(400).json({
        errors: "Try logging with correct password",
      });
    }

    const data = {
        user: {
            id: userData.id
        }
    }

    const authToken = jwt.sign(data, jwtSecret);
    return res.json({ success: true, authToken: authToken });
  } catch (error) {
    res.json({ success: false });
  }
});

module.exports = router;
