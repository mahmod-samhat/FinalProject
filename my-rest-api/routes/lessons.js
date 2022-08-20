const Lesson = require("../models/lesson");
const express = require("express");
const router = express.Router();
const {
  getAllLessons,
  addLesson,
  deleteLesson,
  lessonById,
} = require("../conttrollers/lessons");

router.get("/", (req, res) => {
  getAllLessons()
    .then((lessons) => res.status(200).json(lessons))
    .catch((err) => res.status(400).json(err));
});
router.get("/lessonById/:id", (req, res) => {
  const _id = req.params.id;
  lessonById(_id)
    .then((lessons) => res.status(200).json(lessons))
    .catch((err) => res.status(400).json(err));
});
router.delete("/delete/:id", (req, res) => {
  const _id = req.params.id;
  deleteLesson(_id)
    .then((lesson) => res.status(200).json(lesson))
    .catch((err) => res.status(400).json(err));
});
router.post("/newLesson", (req, res) => {
  const lesson = req.body;
  addLesson(lesson)
    .then((lesson) => {
      res.status(200).json({
        status: "Sucssces",
        data: lesson,
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
