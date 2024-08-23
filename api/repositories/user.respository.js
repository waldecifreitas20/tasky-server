const sql = require("../../database/database");


const throwError = (statusCode, name, message) => {
  throw  {
    statusCode: 400,
    name: "duplicated account",
    message: "User account already exists",
  }
}

async function createUser(userData) {

  try {
    return await sql`
      INSERT INTO 
        users (username, email, password) 
      VALUES 
        (${userData.username}, ${userData.email} , ${userData.password});`;
  } catch (error) {
    console.log(error);

    if (error.code == "23505") {
      throwError(400, "duplicated account", "User account already exists");
    }

    throwError(502, "several error", "Unknown error at database");
  }
}

module.exports = {
  createUser,
}