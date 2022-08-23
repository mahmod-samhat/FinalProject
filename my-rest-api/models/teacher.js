const mongoose = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const teacherSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: "The field name is a required field!",
      unique: true,
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
    post: {
      type: Number,
      required: "The post number is a required field!",
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      default: null,
      autopopulate: true,
    },

    lessons: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Lesson",
      default: [],
      autopopulate: true,
    },
    email: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 255,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 1024,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    imageURL: {
      type: String,
      default:
        "https://akim.org.il/wp-content/uploads/2019/09/akim_pics-15.png",
    },
    room_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ClassRoom",
      default: null,
      autopopulate: true,
    },
    resetLink: { data: String, default: "" },
  },
  { timestamps: true }
);

teacherSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      isAdmin: this.isAdmin,
      fName: this.fName,
      lName: this.lName,
    },
    config.get("jwtKey"),
    { expiresIn: "24h" }
  );
  return token;
};
teacherSchema.methods.cancelRoomId = function () {
  this.room_id = null;
};

teacherSchema.methods.validateTeacher = function (teacher) {
  const schema = Joi.object({
    email: Joi.string()
      .min(6)
      .max(255)
      .required()
      .email({ tlds: { allow: false } }),
    password: Joi.string().min(6).max(1024).required(),
    fName: Joi.string().max(1024).required(),
    lName: Joi.string().max(1024).required(),
    adress: Joi.string().max(1024).required(),
    birth: Joi.date().required(),
    phone: Joi.string().max(10).required(),
    post: Joi.number().max(1024).required(),
    subject: Joi.required(),
    id: Joi.string().max(1024).required(),
  });
  return schema.validate(teacher);
};

teacherSchema.methods.hashPassword = async function () {
  this.password = await bcrypt.hash(this.password, 10);
};

module.exports = mongoose.model("Teacher", teacherSchema, "teachers");
