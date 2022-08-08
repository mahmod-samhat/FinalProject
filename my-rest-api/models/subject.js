const mongoose = require("mongoose");
const Joi = require("joi");
const subjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: "The field name is a required field!",
      unique: true,
    },

    coordinator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      default: null,
      autopopulate: true,
    },

    teachers: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Teacher",
      autopopulate: true,

      default: [],
    },

    lessons: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Lesson",
      autopopulate: true,
      default: [],
    },

    description: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

subjectSchema.methods.validateSubject = function (subject) {
  const schema = Joi.object({
    name: Joi.string().max(1024).required(),
  });
  return schema.validate(subject);
};

module.exports = mongoose.model("Subject", subjectSchema, "subjects");
