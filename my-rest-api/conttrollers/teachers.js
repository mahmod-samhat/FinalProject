const Teacher = require("../models/teacher");
const Subject = require("../models/subject");
const bcrypt = require("bcrypt");

function getAllTeachers() {
  return new Promise((resolve, reject) => {
    Teacher.find()
      .populate("subject")
      .populate("room_id")
      .then((teachers) => resolve(teachers))
      .catch((err) => reject(err));
  });
}

function getTeachersBySubject(subjectName) {
  return new Promise((resolve, reject) => {
    Teacher.findOne({ subject: subjectName })
      .then((teachers) => resolve(teachers))
      .catch((err) => reject(err));
  });
}
function getTeacherById(id) {
  return new Promise((resolve, reject) => {
    Teacher.findOne({ id })
      .populate("subject")
      .populate("room_id")
      .then((teacher) => resolve(teacher))
      .catch((err) => reject(err));
  });
}

function addTeacher(teacher) {
  return new Promise(async (resolve, reject) => {
    const newTeacher = new Teacher(teacher);
    const { error, value } = newTeacher.validateTeacher(teacher);
    if (error) reject(error);
    else {
      await newTeacher.hashPassword();
      newTeacher
        .save()
        .then(async (teacher) => {
          await Subject.findOneAndUpdate(
            { _id: teacher.subject },
            { $push: { teachers: teacher._id } }
          )
            .then((classRoom) => resolve(classRoom))
            .catch((err) => reject(err));
        })
        .catch((err) => reject(err));
    }
  });
}
function logIn(email, password) {
  return new Promise(async (resolve, reject) => {
    if (!(email && password)) res.status(400).send("All input is required");
    const teacher = await Teacher.findOne({ email });
    if (teacher && (await bcrypt.compare(password, teacher.password))) {
      const token = await teacher.generateAuthToken();
      resolve(token);
    } else {
      reject({
        status: "failed",
        message:
          "Invalid Credentials  !! Check your email and password please!!",
      });
    }
  });
}

function deleteTeacher(id) {
  return new Promise(async (resolve, reject) => {
    Teacher.findOneAndDelete({ id })
      .then((teacher) => resolve(teacher))
      .catch((err) => reject(err));
  });
}
function updateTeacher(id, teacher) {
  return new Promise(async (resolve, reject) => {
    Teacher.findOneAndUpdate({ id }, teacher)
      .then((teacher) => resolve(teacher))
      .catch((err) => reject(err));
  });
}

function setTeacherClass_id(_id, room_id) {
  return new Promise(async (resolve, reject) => {
    Teacher.findOneAndUpdate({ _id }, { room_id })
      .then((teacher) => resolve(teacher))
      .catch((err) => reject(err));
  });
}

module.exports = {
  getAllTeachers,
  addTeacher,
  logIn,
  getTeachersBySubject,
  getTeacherById,
  deleteTeacher,
  updateTeacher,
  setTeacherClass_id,
};