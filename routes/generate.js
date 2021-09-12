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

router.get("/is_auth/:_id", auth, async (req, res) => {
  try {
    const id = req.params;
    const data = await Story.findOne({ owner: id });
    res.json(data);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
});

router.put("/save_data_2048/:_id", auth, async (req, res) => {
  try {
    const newRecord = req.body.record;
    const id = req.params;
    const data = await Story.findOne({ owner: id });
    if (data.record2048 < Number(newRecord)) {
      await Story.updateOne({ owner: id }, { record2048: Number(newRecord) });
    }
    res.json({ message: "chikipooki" });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
});

router.get("/losses/:_id", auth, async (req, res) => {
  try {
    const id = req.params;
    const data = await Story.findOne({ owner: id });
    await Story.updateOne({ owner: id }, { losses: data.losses + 1 });

    res.json({ message: "chikipooki" });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
});

router.get("/victories/:_id", auth, async (req, res) => {
  try {
    const id = req.params;
    const data = await Story.findOne({ owner: id });
    await Story.updateOne({ owner: id }, { victories: data.victories + 1 });

    res.json({ message: "chikipooki" });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
});

router.get("/rating/", async (req, res) => {
  try {
    const data = await Story.find();
    const filtData = data.map((item) => {
      return {
        name: item.userName,
        rating:
          item.victories === 0
            ? 0
            : (item.losses + item.victories) / item.victories,
        rating_2048: item.record2048,
      };
    });
    res.json({ data: filtData });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
});

module.exports = router;
