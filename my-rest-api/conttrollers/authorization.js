const Teacher = require("../models/teacher");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const Admin = require("../models/admin");

function getUserById(_id) {
  return new Promise((resolve, reject) => {
    User.findOne({ _id })
      .populate("subject")
      .populate("room_id")
      .populate("lessons")
      .populate({ path: "lessons", populate: { path: "classRoom" } })
      .then((teacher) => resolve(teacher))
      .catch((err) => reject(err));
  });
}

function forgotPassword(email) {
  return new Promise(async (resolve, reject) => {
    await Teacher.findOne(email)
      .then((teacher) => {
        if (!teacher) reject({ error: "User with this email does not exist" });

        const token = jwt.sign({ _id: teacher._id }, config.get("jwtKey"), {
          expiresIn: "15m",
        });

        let transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            user: "adamz.samhat@gmail.com",
            pass: config.get("adamzNodemailer"),
          },
        });

        const data = {
          to: "mahmod_samhat@hotmail.co.il",
          subject: "Reset Account Password Link",
          html: `
      <h3>Please click the link below to reset your password</h3>
      <a href="http://localhost:4040/resetPassword/${token}">http://localhost:4040/resetPassword/${token}</a>
      `,
        };

        transporter.sendMail(data, function (error, body) {
          if (error) {
            reject({ error: error.message });
          }
          resolve({
            message: "Email has been sent, please follow the instructions",
          });
        });
      })
      .catch((err) => reject(err));
  });
}

function resetPassword(newPassword, token) {
  return new Promise(async (resolve, reject) => {
    if (token) {
      jwt.verify(token, config.get("jwtKey"), (err, decoded) => {
        if (err) reject({ error: "Incorrect token or it is expired" });
        Teacher.findOne({ _id: decoded._id })
          .then(async (teacher) => {
            if (!teacher)
              reject({ error: "Teacher with this token does not exist" });
            teacher.password = newPassword;
            await teacher.hashPassword();
            teacher
              .save()
              .then((result) =>
                resolve({
                  message: "Your password has been changed",
                })
              )
              .catch((err) =>
                reject({
                  error: err,
                })
              );
          })
          .catch((err) => {
            reject({ error: "Teacher with this token does not exist" });
          });
      });
    } else reject({ error: "Authentication Error" });
  });
}

function generateAuthToken(_id) {
  const token = jwt.sign(
    {
      _id,
    },
    config.get("jwtKey"),
    { expiresIn: "24h" }
  );
  return token;
}
function logIn(email, password) {
  return new Promise(async (resolve, reject) => {
    if (!(email && password)) res.status(400).send("All input is required");
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = generateAuthToken(user._id);
      resolve(token);
    } else {
      reject({
        status: "failed",
        message:
          "Invalid Credentials  !! Check your email and password please!!",
      });
    }
  });
}
function getAdmin() {
  return new Promise((resolve, reject) => {
    Admin.find()
      .then((admin) => resolve(admin))
      .catch((err) => reject(err));
  });
}

function addAdmin(admin) {
  return new Promise(async (resolve, reject) => {
    const existUser = await User.findOne({ id: admin.id });
    if (existUser) reject(`יש מנהל משופץ במערכת עם ת.ז ${existUser.id}`);
    const existEmail = await User.findOne({ email: admin.email });
    if (existEmail)
      reject(`יש מנהל משופץ במערכת עם אימייל ${existEmail.email}`);
    const newAdmin = await new Admin(admin);
    newAdmin
      .save()
      .then((admin) => resolve(admin))
      .catch((err) => reject(err));
    const { error, value } = newAdmin.validateUser(admin);
    if (error) reject(error);
    else {
      await newAdmin.hashPassword();
      newAdmin
        .save()
        .then((admin) => resolve(admin))
        .catch((err) => reject(err));
    }
  });
}

module.exports = {
  forgotPassword,
  logIn,
  resetPassword,
  addAdmin,
  getUserById,
  getAdmin,
};
