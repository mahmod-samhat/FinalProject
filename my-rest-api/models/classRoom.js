const mongoose = require("mongoose");
const Joi = require("joi");
const classRoomSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: "The field name is a required field!",
      unique: true,
    },

    grade: {
      type: String,
      required: "The grade is a required field!",
    },

    classRoomTeacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      default: null,
      autopopulate: true,
    },
    students: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Student",
      default: [],
      autopopulate: true,
    },

    notes: {
      type: Array,
      default: [],
    },
    description: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

classRoomSchema.methods.validateClassRoom = function (classRoom) {
  const schema = Joi.object({
    id: Joi.string().max(1024).required(),
    grade: Joi.string().max(1024).required(),
  });
  return schema.validate(classRoom);
};

module.exports = mongoose.model("ClassRoom", classRoomSchema, "classRooms");
