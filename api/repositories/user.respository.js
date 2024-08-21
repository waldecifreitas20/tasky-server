const sql = require("../../database/database");

async function createUser(userData) {


  return await sql`INSERT INTO 
      users (username, email, password) 
    VALUES 
       (${userData.username}, ${userData.email} , ${userData.password});`;

}

module.exports = {
  createUser,
}