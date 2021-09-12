const { Router } = require("express");
const { getArr } = require("../game_func/sudoku");
const {
  playCards,
  cardsList,
  fakeDate,
  length,
} = require("../static/play_cards");
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

router.get("/play_cards", async (req, res) => {
  try {
    res.json(playCards);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
});

router.get("/all_play_cards", async (req, res) => {
  try {
    res.json(cardsList);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
});

router.get("/36_play_cards", async (req, res) => {
  try {
    res.json(cardsList.filter((item) => item.index > 5));
  } catch (e) {
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
});

router.get("/fakeDate_play_cards", async (req, res) => {
  try {
    res.json(fakeDate);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
});

router.get("/fakelength_play_cards", async (req, res) => {
  try {
    res.json(length);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
});

module.exports = router;
