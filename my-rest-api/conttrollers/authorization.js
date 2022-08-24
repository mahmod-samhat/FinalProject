const Teacher = require("../models/teacher");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcrypt");

const nodemailer = require("nodemailer");

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
            user: "mahmod.samhat@gmail.com",
            pass: "efizwwpoikceaptv",
          },
        });

        const data = {
          to: "mahmod_samhat@hotmail.co.il",
          subject: "Reset Account Password Link",
          html: `
      <h3>Please click the link below to reset your password</h3>
      <p>http://localhost:3000/api/auth/resetPassword/${token}</p>
      `,
        };
        teacher.updateOne({ resetLink: token }, (err, user) => {
          if (err) {
            reject({ error: "Reset password link error" });
          } else {
            transporter.sendMail(data, function (error, body) {
              if (error) {
                reject({ error: error.message });
              }
              resolve({
                message: "Email has been sent, please follow the instructions",
              });
            });
          }
        });
      })
      .catch((err) => reject(err));
  });
}

function resetPassword(token,newPassword) {
  return new Promise(async (resolve, reject) => {
    if (token) {
      jwt.verify(token, config.get("jwtKey"), function (error, decodedData) {
        if (error) reject({ error: "Incorrect token or it is expired" });
        Teacher.findOne({ resetLink: token })
          .then(async (teacher) => {
            if (!teacher)
              reject({ error: "Teacher with this token does not exist" });
            teacher.password = newPassword;
            await teacher.hashPassword();

            teacher
              .save()
              .then((result) =>
                resolve({ message: "Your password has been changed" })
              )
              .catch((err) =>
                reject({
                  error: "Reset Password Error",
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
function logIn(email, password) {
  return new Promise(async (resolve, reject) => {
    if (!(email && password)) res.status(400).send("All input is required");
    const teacher = await Teacher.findOne({ email });
    if (teacher && (await bcrypt.compare(password, teacher.password))) {
      const token = await teacher.generateAuthToken();
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
module.exports = {
  forgotPassword,
  logIn,
  resetPassword,
};
