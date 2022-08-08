const Subject = require("../models/subject");

function getAllSubjects() {
  return new Promise((resolve, reject) => {
    Subject.find()
      .populate("coordinator")
      .then((subjects) => resolve(subjects))
      .catch((err) => reject(err));
  });
}

function addSubject(subject) {
  return new Promise(async (resolve, reject) => {
    const newSubject = new Subject(subject);
    const { error, value } = newSubject.validateSubject(subject);
    if (error) reject(error);
    else {
      newSubject
        .save()
        .then((subject) => resolve(subject))
        .catch((err) => reject(err));
    }
  });
}

function deleteSubject(id) {
  return new Promise(async (resolve, reject) => {
    Subject.findOneAndDelete({ id })
      .then((subject) => resolve(subject))
      .catch((err) => reject(err));
  });
}
function updateSubject(_id, subject) {
  return new Promise(async (resolve, reject) => {
    Subject.findOneAndUpdate({ _id }, subject)
      .then((subject) => resolve(subject))
      .catch((err) => reject(err));
  });
}

module.exports = {
  getAllSubjects,
  addSubject,
  updateSubject,
  deleteSubject,
};
