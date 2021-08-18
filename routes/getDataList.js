const { Router } = require("express");
const { getArr } = require("../game_func/sudoku");
const router = Router();

router.get("/participants", async (req, res) => {
  try {
    res.json([
      { name: "Armine", type: "gerazancik" },
      { name: "Shavarsh", type: "maladec" },
      { name: "Artyom", type: "shaxmat" },
      { name: "Artur", type: "ft-t-t-t--t-t-t" },
    ]);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
});

router.get("/sudoku", async (req, res) => {
  try {
    let sudoku = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
    ];
    const mtr = await getArr(sudoku);
    res.json(mtr);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
});

module.exports = router;
