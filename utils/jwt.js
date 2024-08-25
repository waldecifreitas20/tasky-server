const { API_KEY } = require("../config/server.env");
const jwt = require("jsonwebtoken");

function generateToken(payload) {
  const token = jwt.sign(payload, API_KEY, { expiresIn: "10d" });
  return `Bearer ${token}`
}

function isValidToken(token) {
  try {
    jwt.verify(token, API_KEY);

    return true;
  } catch (error) {
    return false;
  }
}

module.exports = {
  generateToken,
  isValidToken
}