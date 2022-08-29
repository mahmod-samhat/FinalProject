const Student = require("../models/student");
const ClassRoom = require("../models/classRoom");

function getAllStudents() {
  return new Promise((resolve, reject) => {
    Student.find()
      .populate({ path: "classRoom", populate: { path: "classRoomTeacher" } })
      .populate({
        path: "results",
        populate: { path: "lesson", populate: { path: "subject" } },
      })
      .then((students) => resolve(students))
      .catch((err) => reject(err));
  });
}

function studentsByClassRoom(classRoom) {
  return new Promise((resolve, reject) => {
    Student.find({ classRoom })
      .populate({ path: "classRoom", populate: { path: "classRoomTeacher" } })
      .populate({
        path: "results",
        populate: { path: "lesson", populate: { path: "subject" } },
      })
      .then((students) => resolve(students))
      .catch((err) => reject(err));
  });
}

function addStudent(student) {
  return new Promise(async (resolve, reject) => {
    const newStudent = new Student(student);
    const { error, value } = newStudent.validateStudent(student);
    if (error) reject(error);
    else {
      newStudent
        .save()
        .then(async (student) => {
          await ClassRoom.findOneAndUpdate(
            { _id: student.classRoom },
            { $push: { students: student._id } }
          )
            .then((classRoom) => resolve(student))
            .catch((err) => reject(err));
        })
        .catch((err) => reject(err));
    }
  });
}
function deleteStudent(_id) {
  return new Promise(async (resolve, reject) => {
    await Student.findOneAndDelete({ _id })
      .then(async (student) => {
        await ClassRoom.findOneAndUpdate(
          { _id: student.classRoom },
          { $pull: { students: student._id } }
        )
          .then((classRoom) => resolve(classRoom))
          .catch((err) => reject(err));
      })
      .catch((err) => reject(err));
  });
}
function updateStudent(id, student) {
  return new Promise(async (resolve, reject) => {
    Student.findOneAndUpdate({ id }, student)
      .then((student) => resolve(student))
      .catch((err) => reject(err));
  });
}
function getStudentById(id) {
  return new Promise((resolve, reject) => {
    Student.findOne({ id })
      .populate({ path: "classRoom", populate: { path: "classRoomTeacher" } })
      .populate({
        path: "results",
        populate: { path: "lesson", populate: { path: "subject" } },
      })
      .then((student) => resolve(student))
      .catch((err) => reject(err));
  });
}

module.exports = {
  getAllStudents,
  addStudent,
  getStudentById,
  updateStudent,
  deleteStudent,
  studentsByClassRoom,
};
