const User = require("../models/user");
const Teacher = User.teacher;
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  getAllTeachers,
  addTeacher,
  getTeachersBySubject,
  getTeacherById,
  deleteTeacher,
  updateTeacher,
} = require("../conttrollers/teachers");

router.get("/", auth, (req, res) => {
  getAllTeachers()
    .then((teachers) => res.status(200).json(teachers))
    .catch((err) => res.status(400).json(err));
});
router.get("/teachersBySubject/:subjectname", auth, (req, res) => {
  const subjectName = req.params.subjectname;
  getTeachersBySubject(subjectName)
    .then((teachers) => res.status(200).json(teachers))
    .catch((err) => res.status(400).json(err));
});

router.post("/newTeacher", auth, (req, res) => {
  let {
    id,
    fName,
    lName,
    email,
    password,
    phone,
    adress,
    post,
    subject,
    birth,
  } = req.body;
  const teacher = {
    id,
    fName,
    lName,
    email,
    password,
    phone,
    adress,
    post,
    subject,
    birth,
  };
  addTeacher(teacher)
    .then((teacher) => {
      res.status(200).json({
        status: "Sucssces",
        data: teacher,
      });
    })
    .catch((err) => {
      const error = err.details ? err.details[0].message : err;
      res.status(400).json({
        status: "error!! check your inputs please",
        message: error,
      });
    });
});

router.get("/teacherById/:id", auth, (req, res) => {
  const _id = req.params.id;
  getTeacherById(_id)
    .then((teacher) => res.status(200).json(teacher))
    .catch((err) => res.status(400).json(err));
});

router.delete("/delete/:id", auth, (req, res) => {
  const id = req.params.id;
  deleteTeacher(id)
    .then((teacher) => res.status(200).json(teacher))
    .catch((err) => res.status(400).json(err));
});
router.put("/update/:id", auth, (req, res) => {
  const id = req.params.id;
  const teacher = req.body;
  updateTeacher(id, teacher)
    .then((teacher) => res.status(200).json(teacher))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
