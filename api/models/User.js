const getPath = require("path").resolve;
const SQL = require(getPath("database/database.js"))

class UserModel {

  async getByPk(email) {
    return await SQL`
    SELECT * FROM users WHERE users.email = ${email};
  `;
  }

  async create(userData) {
    return await SQL`
      INSERT INTO 
        users (username, email, password) 
      VALUES 
        (${userData.username}, ${userData.email} , ${userData.password});`
  }

}

module.exports = { UserModel: new UserModel() };