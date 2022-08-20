const mongoose = require("mongoose");
const Joi = require("joi");
const studentSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: "The field name is a required field!",
      unique: true,
    },
    gender: {
      type: String,
      required: "The field gender is a required field!",
    },
    fName: {
      type: String,
      required: "The field fName is a required field!",
    },
    lName: {
      type: String,
      required: "The field lName is a required field!",
    },
    birth: {
      type: Date,
      required: "The birth text is a required field!",
    },

    phone: {
      type: String,
      required: "The phone text is a required field!",
    },
    adress: {
      type: String,
      required: "The adress is a required field!",
    },

    grade: {
      type: String,
      required: "The grade  is a required field!",
    },
    classRoom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ClassRoom",
      default: null,
      autopopulate: true,
    },

    email: {
      type: String,
      default: "",
    },
    notes: {
      type: Array,
      default: [],
    },
    results: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Score",
      autopopulate: true,
      default: [],
    },

    imageURL: {
      type: String,
      default:
        "https://akim.org.il/wp-content/uploads/2019/09/akim_pics-15.png",
    },
    description: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

studentSchema.methods.validateStudent = function (student) {
  const schema = Joi.object({
    id: Joi.string().max(1024).required(),
    gender: Joi.string().max(1024).required(),
    fName: Joi.string().max(1024).required(),
    lName: Joi.string().max(1024).required(),
    adress: Joi.string().max(1024).required(),
    birth: Joi.date().required(),
    phone: Joi.string().max(10).required(),
    grade: Joi.string().max(1024).required(),
    classRoom: Joi.string().max(1024).required(),
  });
  return schema.validate(student);
};

module.exports = mongoose.model("Student", studentSchema, "students");
