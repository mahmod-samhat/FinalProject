const Lesson = require("../models/lesson");
var mongoose = require("mongoose");
const Subject = require("../models/subject");
const Teacher = require("../models/teacher");

function getAllLessons() {
  return new Promise(async (resolve, reject) => {
    await Lesson.find()
      .populate("subject")
      .populate("teacher")
      .populate("classRoom")
      .then((lessons) => resolve(lessons))
      .catch((err) => reject(err));
  });
}
function lessonById(_id) {
  return new Promise(async (resolve, reject) => {
    await Lesson.findById(_id)
      .populate("subject")
      .populate("classRoom")
      .then((lesson) => resolve(lesson))
      .catch((err) => reject(err));
  });
}
function lessonsByTeacher(_id) {
  return new Promise(async (resolve, reject) => {
    await Lesson.find({ teacher: _id })
      .populate("classRoom")
      .then((lessons) => resolve(lessons))
      .catch((err) => reject(err));
  });
}

function deleteLesson(_id) {
  return new Promise(async (resolve, reject) => {
    Lesson.findOneAndDelete({ _id })
      .then(async (lesson) => {
        await Teacher.findOneAndUpdate(
          { _id: lesson.teacher },
          { $pull: { lessons: lesson._id } }
        )
          .then(async (teacher) => {
            await Subject.findOneAndUpdate(
              { _id: lesson.subject },
              { $pull: { lessons: lesson._id } }
            )
              .then((subject) => resolve(lesson))
              .catch((err) => reject(err));
          })
          .catch((err) => reject(err));
      })
      .catch((err) => reject(err));
  });
}
function addLesson(lesson) {
  return new Promise(async (resolve, reject) => {
    const exisLLesson = await Lesson.findOne({
      classRoom: lesson.classRoom,
      subject: lesson.subject,
    });

    if (exisLLesson) reject("השיעור שבחרת כבר משופץ לכיתה!!");
    else {
      const newLesson = new Lesson(lesson);
      newLesson
        .save()
        .then(async (lesson) => {
          await Teacher.findOneAndUpdate(
            { _id: lesson.teacher },
            { $push: { lessons: lesson._id } }
          )
            .then(async (teacher) => {
              await Subject.findOneAndUpdate(
                { _id: lesson.subject },
                { $push: { lessons: lesson._id } }
              )
                .then((subject) => resolve(lesson))
                .catch((err) => reject(err));
            })
            .catch((err) => reject(err));
        })
        .catch((err) => reject(err));
    }
  });
}

module.exports = {
  getAllLessons,
  addLesson,
  deleteLesson,
  lessonById,
  lessonsByTeacher,
};
