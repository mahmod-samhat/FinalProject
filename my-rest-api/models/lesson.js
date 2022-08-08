const mongoose = require("mongoose");
const Joi = require("joi");
const lessonSchema = new mongoose.Schema(
  {
    grade: {
      type: String,
      required: "The field grade is a required field!",
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      default: null,
      autopopulate: true,
    },

    classRoom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ClassRoom",
      default: null,
      autopopulate: true,
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      autopopulate: true,
      default: null,
    },

    description: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lesson", lessonSchema, "lessons");
