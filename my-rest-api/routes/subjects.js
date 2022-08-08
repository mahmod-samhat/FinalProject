const Subject = require("../models/subject");
const express = require("express");
const router = express.Router();
const {
  getAllSubjects,
  addSubject,
  deleteSubject,
  updateSubject,
} = require("../conttrollers/subjects");

router.get("/", (req, res) => {
  getAllSubjects()
    .then((subjects) => res.status(200).json(subjects))
    .catch((err) => res.status(400).json(err));
});

router.post("/newSubject", (req, res) => {
  const { name } = req.body;
  const subject = {
    name,
  };
  addSubject(subject)
    .then((subject) => {
      res.status(200).json({
        status: "Sucssces",
        data: subject,
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
router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  deleteSubject(id)
    .then((subject) => res.status(200).json(subject))
    .catch((err) => res.status(400).json(err));
});
router.put("/update/:id", (req, res) => {
  const id = req.params.id;
  const subject = req.body;
  updateSubject(id, subject)
    .then((subject) => res.status(200).json(subject))
    .catch((err) => res.status(400).json(err));
});
module.exports = router;
