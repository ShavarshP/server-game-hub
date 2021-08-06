const { Router } = require("express");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = {
      email: "shavarsh101097@gmmai.com",

      password: "shavarsh222",
    };

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User is not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid password, please try again" });
    }

    const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
      expiresIn: "1h",
    });

    res.json({ token, userId: user.id });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
});

module.exports = router;
