const Teacher = require("../models/teacher");
const express = require("express");
const router = express.Router();
const {
  getAllTeachers,
  addTeacher,
  logIn,
  getTeachersBySubject,
  getTeacherById,
  deleteTeacher,
  updateTeacher,
} = require("../conttrollers/teachers");

router.get("/", (req, res) => {
  getAllTeachers()
    .then((teachers) => res.status(200).json(teachers))
    .catch((err) => res.status(400).json(err));
});
router.get("/teachersBySubject/:subjectname", (req, res) => {
  const subjectName = req.params.subjectname;
  getTeachersBySubject(subjectName)
    .then((teachers) => res.status(200).json(teachers))
    .catch((err) => res.status(400).json(err));
});

router.post("/newTeacher", (req, res) => {
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
        messege: error,
      });
    });
});

router.post("/logIn", (req, res) => {
  const { email, password } = req.body;
  if (!(email && password)) res.status(400).send("All input is required");
  logIn(email, password)
    .then((token) => res.status(200).json({ token }))
    .catch((err) => res.status(400).json(err));
});

router.get("/teacherById/:id", (req, res) => {
  const id = req.params.id;
  getTeacherById(id)
    .then((teacher) => res.status(200).json(teacher))
    .catch((err) => res.status(400).json(err));
});

router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  deleteTeacher(id)
    .then((teacher) => res.status(200).json(teacher))
    .catch((err) => res.status(400).json(err));
});
router.put("/update/:id", (req, res) => {
  const id = req.params.id;
  const teacher = req.body;
  updateTeacher(id, teacher)
    .then((teacher) => res.status(200).json(teacher))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
