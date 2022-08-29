const ClassRoom = require("../models/classRoom");
const Teacher = require("../models/teacher");

function getAllClassRooms() {
  return new Promise((resolve, reject) => {
    ClassRoom.find()
      .populate("classRoomTeacher")
      .then((ClassRooms) => resolve(ClassRooms))
      .catch((err) => reject(err));
  });
}
function getClassRoomById(_id) {
  return new Promise((resolve, reject) => {
    ClassRoom.findOne({ _id })
      .populate({ path: "students", populate: { path: "results" } })
      .then((classRoom) => resolve(classRoom))
      .catch((err) => reject(err));
  });
}
function addClassRoom(classRoom) {
  return new Promise(async (resolve, reject) => {
    const newClassRoom = new ClassRoom(classRoom);
    const { error, value } = newClassRoom.validateClassRoom(classRoom);
    if (error) reject(error);
    else {
      newClassRoom
        .save()
        .then((classRoom) => resolve(classRoom))
        .catch((err) => reject(err));
    }
  });
}

function deleteClassRoom(_id) {
  return new Promise(async (resolve, reject) => {
    ClassRoom.findOneAndDelete({ _id })
      .then((classRoom) => {
        Teacher.findOneAndUpdate(
          { room_id: classRoom._id },
          { room_id: null }
        ).then((teacher) => {
          resolve(classRoom);
        });
      })
      .catch((err) => reject(err));
  });
}
function setClassRoomTeacher(_id, classRoomTeacher) {
  return new Promise(async (resolve, reject) => {
    ClassRoom.findOneAndUpdate({ _id }, { classRoomTeacher })
      .then((classRoom) => resolve(classRoom))
      .catch((err) => reject(err));
  });
}

module.exports = {
  getAllClassRooms,
  addClassRoom,
  deleteClassRoom,
  setClassRoomTeacher,
  getClassRoomById,
};
