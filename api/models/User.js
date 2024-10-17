const getPath = require("path").resolve;
const { sql } = require(getPath("database/database.js"))

class UserModel {

  async getByPk(email) {
    return await sql`
    SELECT * FROM users WHERE users.email = ${email};
  `;
  }

  async create(userData) {
    return await sql`
      INSERT INTO 
        users (username, email, password) 
      VALUES 
        (${userData.username}, ${userData.email} , ${userData.password});`
  }

}

module.exports = { UserModel: new UserModel() };