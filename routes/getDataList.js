const { Router } = require("express");
const { getArr } = require("../game_func/sudoku");
const router = Router();

let playCards = {
  imgUrl: "https://www.dcode.fr/tools/playing-cards/images/<img_id>.png",
  spades: [
    { name: "1S", img_id: "pique_a", index: 13 },
    { name: "2S", img_id: "pique_2", index: 1 },
    { name: "3S", img_id: "pique_3", index: 2 },
    { name: "4S", img_id: "pique_4", index: 3 },
    { name: "5S", img_id: "pique_5", index: 4 },
    { name: "6S", img_id: "pique_6", index: 5 },
    { name: "7S", img_id: "pique_7", index: 6 },
    { name: "8S", img_id: "pique_8", index: 7 },
    { name: "9S", img_id: "pique_9", index: 8 },
    { name: "10S", img_id: "pique_10", index: 9 },
    { name: "JS", img_id: "pique_v", index: 10 },
    { name: "QS", img_id: "pique_d", index: 11 },
    { name: "KS", img_id: "pique_r", index: 12 },
  ],
  diamonds: [
    { name: "1D", img_id: "carreau_a", index: 13 },
    { name: "2D", img_id: "carreau_2", index: 1 },
    { name: "3D", img_id: "carreau_3", index: 2 },
    { name: "4D", img_id: "carreau_4", index: 3 },
    { name: "5D", img_id: "carreau_5", index: 4 },
    { name: "6D", img_id: "carreau_6", index: 5 },
    { name: "7D", img_id: "carreau_7", index: 6 },
    { name: "8D", img_id: "carreau_8", index: 7 },
    { name: "9D", img_id: "carreau_9", index: 8 },
    { name: "10D", img_id: "carreau_10", index: 9 },
    { name: "JD", img_id: "carreau_v", index: 10 },
    { name: "QD", img_id: "carreau_d", index: 11 },
    { name: "KD", img_id: "carreau_r", index: 12 },
  ],
  hearts: [
    { name: "1H", img_id: "coeur_a", index: 13 },
    { name: "2H", img_id: "coeur_2", index: 1 },
    { name: "3H", img_id: "coeur_3", index: 2 },
    { name: "4H", img_id: "coeur_4", index: 3 },
    { name: "5H", img_id: "coeur_5", index: 4 },
    { name: "6H", img_id: "coeur_6", index: 5 },
    { name: "7H", img_id: "coeur_7", index: 6 },
    { name: "8H", img_id: "coeur_8", index: 7 },
    { name: "9H", img_id: "coeur_9", index: 8 },
    { name: "10H", img_id: "coeur_10", index: 9 },
    { name: "JH", img_id: "coeur_v", index: 10 },
    { name: "QH", img_id: "coeur_d", index: 11 },
    { name: "KH", img_id: "coeur_r", index: 12 },
  ],
  clubs: [
    { name: "1C", img_id: "trefle_a", index: 13 },
    { name: "2C", img_id: "trefle_2", index: 1 },
    { name: "3C", img_id: "trefle_3", index: 2 },
    { name: "4C", img_id: "trefle_4", index: 3 },
    { name: "5C", img_id: "trefle_5", index: 4 },
    { name: "6C", img_id: "trefle_6", index: 5 },
    { name: "7C", img_id: "trefle_7", index: 6 },
    { name: "8C", img_id: "trefle_8", index: 7 },
    { name: "9C", img_id: "trefle_9", index: 8 },
    { name: "10C", img_id: "trefle_10", index: 9 },
    { name: "JC", img_id: "trefle_v", index: 10 },
    { name: "QC", img_id: "trefle_d", index: 11 },
    { name: "KC", img_id: "trefle_r", index: 12 },
  ],
};
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

module.exports = router;
