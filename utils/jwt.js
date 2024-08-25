const { API_KEY } = require("../config/server.env");
const jwt = require("jsonwebtoken");

function generateToken(payload) {
  const token = jwt.sign(payload, API_KEY);
  return `Bearer ${token}`
}

module.exports = {
  generateToken,
}