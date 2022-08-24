const Student = require("../models/student");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  getAllStudents,
  addStudent,
  getStudentById,
  updateStudent,
  deleteStudent,
  studentsByClassRoom,
} = require("../conttrollers/students");

router.get("/", auth, (req, res) => {
  getAllStudents()
    .then((students) => res.status(200).json(students))
    .catch((err) => res.status(400).json(err));
});

router.get("/studentById/:id", auth, (req, res) => {
  const id = req.params.id;
  getStudentById(id)
    .then((student) => res.status(200).json(student))
    .catch((err) => res.status(400).json(err));
});
router.get("/studentsByClassRoom/:id", auth, (req, res) => {
  const _id = req.params.id;
  studentsByClassRoom(_id)
    .then((students) => res.status(200).json(students))
    .catch((err) => res.status(400).json(err));
});

router.delete("/delete/:id", auth, (req, res) => {
  const _id = req.params.id;
  deleteStudent(_id)
    .then((student) => res.status(200).json(student))
    .catch((err) => res.status(400).json(err));
});
router.put("/update/:id", auth, (req, res) => {
  const id = req.params.id;
  const student = req.body;
  updateStudent(id, student)
    .then((student) => res.status(200).json(student))
    .catch((err) => res.status(400).json(err));
});
router.post("/newstudent", auth, (req, res) => {
  let { id, gender, fName, lName, birth, phone, grade, adress, classRoom } =
    req.body;
  const student = {
    id,
    gender,
    fName,
    lName,
    birth,
    phone,
    grade,
    adress,
    classRoom,
  };
  addStudent(student)
    .then((student) => {
      res.status(200).json({
        status: "Sucssces",
        data: student,
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
