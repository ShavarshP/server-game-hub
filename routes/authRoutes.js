const { Router } = require("express");
const bcrypt = require("bcryptjs");
// const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const router = Router();
const { AuthSchema } = require("../validationSchema/schema");

router.post("/register", async (req, res) => {
  try {
    const { email, userName, password } = req.body;

    const result = await AuthSchema.validateAsync({
      username: userName,
      email: email,
      password: password,
    });
    console.log(result);
    const candidate = await User.findOne({ email });

    if (candidate) {
      return res.status(400).json({ message: "This user already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ email, userName, password: hashedPassword });

    await user.save();

    res.status(201).json({ message: "User created" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
});

module.exports = router;
