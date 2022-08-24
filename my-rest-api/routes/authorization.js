const express = require("express");
const router = express.Router();
const {
  forgotPassword,
  logIn,
  resetPassword,
} = require("../conttrollers/authorization");

router.put("/forgotPassword", (req, res) => {
  const email = req.body;
  forgotPassword(email)
    .then((m) => res.status(200).json(m))
    .catch((err) => res.status(401).json(err));
});
router.get("/resetPassword/:token", (req, res) => {
  const token = req.params.token;
  resetPassword(token)
    .then((m) => res.status(200).json(m))
    .catch((err) => {
      console.log(err);
      res.status(401).json(err);
    });
});
router.post("/logIn", (req, res) => {
  const { email, password } = req.body;
  if (!(email && password)) res.status(400).send("All input is required");
  logIn(email, password)
    .then((token) => res.status(200).json({ token }))
    .catch((err) => res.status(400).json(err));
});
module.exports = router;
