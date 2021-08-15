const { Router } = require("express");
const auth = require("../middleware/auth.middleware");
const Story = require("../models/story");
const router = Router();

router.post("/generate", auth, async (req, res) => {
  try {
    const userName = req.body.userName;
    const owner = req.user.userId;
    const story = new Story({ owner, userName });
    await story.save();
    res.status(201).json({ link: "shash" });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
});
module.exports = router;
