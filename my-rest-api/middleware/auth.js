const jwt = require("jsonwebtoken");
const config = require("config");

// const config = process.env;

const verifyToken = async (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token)
    return res.status(401).send("A token is required for authentication");

  try {
    const decoded = jwt.verify(token, config.get("jwtKey"));
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;
