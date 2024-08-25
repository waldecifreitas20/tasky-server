const userRepo = require("../repositories/user.respository");
const { generateToken } = require("../../utils/jwt");
const bcrypt = require("../../utils/bcrypt");

async function createUser(userData) {

  try {

    const hash = bcrypt.generatePassword(userData.password);

    await userRepo.createUser({
      username: userData.username.toString(),
      email: userData.email.toString(),
      password: hash.toString(),
    });

    const token = generateToken({ username: userData.username, email: userData.email });

    return {
      statusCode: 200,
      body: {
        message: "user account has been created with success",
        authorization: token,
      }
    }

  } catch (error) {

    return {
      statusCode: error.statusCode,
      body: {
        error: error.name,
        message: error.message,
      }
    }
  }

}



async function login(email, password) {
  try {
    const user = await userRepo.getUserByPk(email);



    const token = generateToken({ username: userData.username, email: userData.email });

    return {
      statusCode: 200,
      body: {
        authorization: token,
      }
    }

  } catch (error) {
    return {
      statusCode: error.statusCode,
      body: {
        error: error.name,
        message: error.message,
      }
    }
  }
}
module.exports = {
  createUser,
  login
}