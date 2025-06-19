const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config");

const createJWTToken = (data) => {
  return jwt.sign(data, jwtSecret, { expiresIn: "2h" });
};

const verifyJWTToken = (token) => {
  try {
    const decoded = jwt.verify(token, jwtSecret);
    return decoded;
  } catch (err) {
    console.log(err);
    return { error: err, message: err.message };
  }
};

module.exports = { createJWTToken, verifyJWTToken };
