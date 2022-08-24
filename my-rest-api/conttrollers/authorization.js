const Teacher = require("../models/teacher");
const jwt = require("jsonwebtoken");
const config = require("config");
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
            type: "OAuth2",
            user: "mahmod.samhat@gmail.com",
            pass: "Hacker19323",
            // accessToken: token,
          },
          tls: {
            rejectUnauthorized: false,
          },
        });

        const data = {
          to: "mahmod.samhat@gmail.com",
          subject: "Reset Account Password Link",
          html: `
      <h3>Please click the link below to reset your password</h3>
      <p>http://localhost:3000/api/auth/resetpassword/${token}</p>
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

module.exports = {
  forgotPassword,
};
