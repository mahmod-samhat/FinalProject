const mongoose = require("mongoose");
const Joi = require("joi");
const scoreSchema = new mongoose.Schema(
  {
    score: {
      type: Number,
      required: "The field score is a required field!",
    },

    textScore: {
      type: String,
      default: "",
    },

    heged: {
      type: String,
      default: "",
    },
    semester: {
      type: String,
      default: "",
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      default: null,
      autopopulate: true,
    },

    lesson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
      default: null,
      autopopulate: true,
    },
  },

  { timestamps: true }
);

scoreSchema.methods.validateSubject = function (score) {
  const schema = Joi.object({
    score: Joi.number().max(1024).required(),
    textScore: Joi.string().max(1024).required(),
    heged: Joi.string().max(1024).required(),
  });
  return schema.validate(score);
};

module.exports = mongoose.model("Score", scoreSchema, "scores");
