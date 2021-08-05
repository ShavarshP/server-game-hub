const { Router } = require("express");
const router = Router();

router.get("/participants", async (req, res) => {
  try {
    res.json([
      { name: "Shavarsh", type: "maladec" },
      { name: "Armine", type: "gerazancik" },
      { name: "Artyom", type: "shaxmat" },
      { name: "Artur", type: "ft-t-t-t--t-t-t" },
    ]);
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

module.exports = router;
