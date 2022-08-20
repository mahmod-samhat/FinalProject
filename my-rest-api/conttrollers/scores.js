const Score = require("../models/score");
var mongoose = require("mongoose");
const Student = require("../models/student");
const { chain } = require("lodash");

function getAllScores() {
  return new Promise(async (resolve, reject) => {
    await Score.find()

      .then((scores) => resolve(scores))
      .catch((err) => reject(err));
  });
}

function setScores(scores) {
  return new Promise(async (resolve, reject) => {
    for (const score of scores) {
      let checkScore = await Score.findOne({
        student: score.student,
        semester: score.semester,
        lesson: score.lesson,
      });

      if (checkScore) {
        checkScore.score = score.score;
        checkScore.textScore = score.textScore;
        checkScore.heged = score.heged;
        checkScore.save().catch((err) => reject(err));
      } else {
        const newScore = new Score(score);
        newScore
          .save()
          .then(async (score) => {
            await Student.findOneAndUpdate(
              { _id: score.student },
              { $push: { results: score._id } }
            ).catch((err) => reject(err));
          })
          .catch((err) => reject(err));
      }
    }
    resolve(scores);
  });
}

module.exports = {
  getAllScores,
  setScores,
};
