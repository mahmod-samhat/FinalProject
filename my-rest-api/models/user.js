const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Joi = require("joi");

var options = { discriminatorKey: "kind", timestamps: true };

const userSchema = new mongoose.Schema(
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
    imageURL: {
      type: String,
      default:
        "https://akim.org.il/wp-content/uploads/2019/09/akim_pics-15.png",
    },
  },
  options
);
var User = mongoose.model("User", userSchema);

userSchema.methods.validateUser = function (user) {
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
    id: Joi.string().max(1024).required(),
    subject: Joi.string(),
  });
  return schema.validate(user);
};
userSchema.methods.hashPassword = async function () {
  this.password = await bcrypt.hash(this.password, 10);
};

module.exports = mongoose.model("User", userSchema, "users");
