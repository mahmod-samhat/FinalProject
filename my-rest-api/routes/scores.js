const Score = require("../models/score");
const express = require("express");
const router = express.Router();
const { getAllScores, setScores } = require("../conttrollers/scores");

router.get("/", (req, res) => {
  getAllScores()
    .then((scores) => res.status(200).json(scores))
    .catch((err) => res.status(400).json(err));
});
// router.delete("/delete/:id", (req, res) => {
//   const _id = req.params.id;
//   deleteLesson(_id)
//     .then((lesson) => res.status(200).json(lesson))
//     .catch((err) => res.status(400).json(err));
// });
router.post("/setScores", (req, res) => {
  const scores = req.body;
  setScores(scores)
    .then((score) => {
      res.status(200).json({
        status: "Sucssces",
        data: score,
      });
    })
    .catch((err) => {
      const error = err.details ? err.details[0].message : err;
      res.status(401).json({
        status: "error!! check your inputs please",
        messege: error,
      });
    });
});

module.exports = router;
