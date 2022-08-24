const ClassRoom = require("../models/classRoom");
const Teacher = require("../models/teacher");
const auth = require("../middleware/auth");

const express = require("express");
const router = express.Router();
const {
  getAllClassRooms,
  addClassRoom,
  deleteClassRoom,
  setClassRoomTeacher,
  getClassRoomById,
} = require("../conttrollers/classRooms");
const { setTeacherClass_id } = require("../conttrollers/teachers");

router.get("/", auth, (req, res) => {
  getAllClassRooms()
    .then((classRooms) => res.status(200).json(classRooms))
    .catch((err) => res.status(400).json(err));
});
router.get("/classRoomById/:id", auth, (req, res) => {
  const _id = req.params.id;
  getClassRoomById(_id)
    .then((classRoom) => res.status(200).json(classRoom))
    .catch((err) => res.status(400).json(err));
});
router.patch("/setClassRoomTeacher/:id", auth, async (req, res) => {
  const classRoom_id = req.params.id;
  const teacher_id = req.body.teacher_id;

  await Teacher.findOneAndUpdate({ room_id: classRoom_id }, { room_id: null });
  Promise.all([
    setClassRoomTeacher(classRoom_id, teacher_id),
    setTeacherClass_id(teacher_id, classRoom_id),
  ])
    .then(() => res.status(200).json("success"))
    .catch((err) => res.status(400).json(err));
});

router.delete("/delete/:id", auth, (req, res) => {
  const _id = req.params.id;
  deleteClassRoom(_id)
    .then((classRoom) => res.status(200).json(classRoom))
    .catch((err) => res.status(400).json(err));
});
router.post("/newClassRoom", auth, (req, res) => {
  const { id, grade } = req.body;
  const classRoom = {
    id,
    grade,
  };
  addClassRoom(classRoom)
    .then((classRoom) => {
      res.status(200).json({
        status: "Sucssces",
        data: classRoom,
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
