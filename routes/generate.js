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
    res.status(201).json({ link: "maladec" });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
});

router.get("/is_auth/:_id", async (req, res) => {
  try {
    const id = req.params;
    const homedate = await Home.find(id);
    res.json(homedate);
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

router.get("/is_auth/:_id", auth, async (req, res) => {
  try {
    const id = req.params;
    const data = await Story.find({ owner: id });
    res.json(data);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
});

module.exports = router;
