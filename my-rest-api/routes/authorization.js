const express = require("express");
const router = express.Router();
const {
  forgotPassword,
  logIn,
  resetPassword,
  addAdmin,
  getUserById,
  getAdmin
} = require("../conttrollers/authorization");

router.get("/userById/:id", (req, res) => {
  const _id = req.params.id;
  getUserById(_id)
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(400).json(err));
});
router.put("/forgotPassword", (req, res) => {
  const email = req.body;
  forgotPassword(email)
    .then((m) => res.status(200).json(m))
    .catch((err) => res.status(401).json(err));
});
router.put("/resetPassword", (req, res) => {
  const { newPassword, token } = req.body;
  resetPassword(newPassword.password, token)
    .then((m) => res.status(200).json(m))
    .catch((err) => res.status(401).json(err));
});
router.get("/getAdmin", (req, res) => {
  getAdmin()
    .then((admin) => res.status(200).json(admin))
    .catch((err) => res.status(400).json(err));
});
router.post("/logIn", (req, res) => {
  const { email, password } = req.body;
  if (!(email && password)) res.status(400).send("All input is required");
  logIn(email, password)
    .then((token) => res.status(200).json({ token }))
    .catch((err) => res.status(400).json(err));
});
router.post("/register", (req, res) => {
  let { id, fName, lName, email, password, phone, adress, post, birth } =
    req.body;
  const admin = {
    id,
    fName,
    lName,
    email,
    password,
    phone,
    adress,
    post,
    birth,
  };
  addAdmin(admin)
    .then((amin) => {
      res.status(200).json({
        status: "Sucssces",
        data: admin,
      });
    })
    .catch((err) => {
      const error = err.details ? err.details[0].message : err;
      res.status(400).json({
        status: "error!! check your inputs please",
        message: error,
      });
    });
});

module.exports = router;
