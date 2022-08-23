const express = require("express");
const router = express.Router();
const { forgotPassword } = require("../conttrollers/authorization");

router.put("/forgotPassword", (req, res) => {
  const email = req.body;
  forgotPassword(email)
    .then((m) => res.status(200).json(m))
    .catch((err) => {
      console.log(err);
      res.status(401).json(err);
    });
});

module.exports = router;
