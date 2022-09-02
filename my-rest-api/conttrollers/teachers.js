const Teacher = require("../models/teacher");
const Subject = require("../models/subject");

function getAllTeachers() {
  return new Promise((resolve, reject) => {
    Teacher.find()
      .populate("subject")
      .populate("room_id")
      .populate({ path: "lessons", populate: { path: "classRoom" } })
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
function getTeacherById(_id) {
  return new Promise((resolve, reject) => {
    Teacher.findOne({ _id })
      .populate("subject")
      .populate("room_id")
      .populate("lessons")
      .populate({ path: "lessons", populate: { path: "classRoom" } })
      .then((teacher) => resolve(teacher))
      .catch((err) => reject(err));
  });
}

function addTeacher(teacher) {
  return new Promise(async (resolve, reject) => {
    const existTeacher = await Teacher.findOne({ id: teacher.id });
    if (existTeacher) reject(`יש מורה משופץ במערכת עם ת.ז ${existTeacher.id}`);
    const existEmail = await Teacher.findOne({ email: teacher.email });
    if (existEmail)
      reject(`יש מורה משופץ במערכת עם אימייל ${existEmail.email}`);

    const newTeacher = new Teacher(teacher);
    const { error, value } = newTeacher.validateUser(teacher);
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
  getTeachersBySubject,
  getTeacherById,
  deleteTeacher,
  updateTeacher,
  setTeacherClass_id,
};
