const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

function generatePassword(payload) {
  return bcrypt.hashSync(payload, salt);
}

function checkPassword(hash, password) {
  return bcrypt.compareSync(password, hash);
}

module.exports = {
  generatePassword,
  checkPassword,
}