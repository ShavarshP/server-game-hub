const { Router } = require("express");
const auth = require("../middleware/auth.middleware");
const Story = require("../models/story");
const router = Router();

router.post("/generate", auth, async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    // const story = new Story({ userName, owner});
    // await story.save();
    res.status(201).json({ link: "shash" });
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});
module.exports = router;
