const { Router } = require("express");
const config = require("config");
const shortid = require("shortid");
const Story = require("../models/story");
const auth = require("../middleware/auth.middleware");
const router = Router();

router.post("/generate", auth, async (req, res) => {
  try {
    const { userName, clicks, record2048 } = req.body;
    if (existing) {
      return res.json({ Story: existing });
    }
    const story = new Story({ userName, clicks, record2048 });
    await story.save();
    res.status(201).json({ story });
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

module.exports = router;
