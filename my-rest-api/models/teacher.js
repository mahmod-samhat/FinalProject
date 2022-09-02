const mongoose = require("mongoose");
const User = require("./user");
const Joi = require("joi");

var options = { discriminatorKey: "kind", timestamps: true };

const teacherSchema = new mongoose.Schema(
  {
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

    room_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ClassRoom",
      default: null,
      autopopulate: true,
    },
  },
  options
);
teacherSchema.methods.cancelRoomId = function () {
  this.room_id = null;
};

User.discriminator("Teacher", teacherSchema);
module.exports = mongoose.model("Teacher");
