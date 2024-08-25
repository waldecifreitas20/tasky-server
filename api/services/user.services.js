const userRepo = require("../repositories/user.respository");
const { generateToken } = require("../../utils/jwt");

async function createUser(userData) {

  try {

    await userRepo.createUser({
      username: userData.username.toString(),
      email: userData.email.toString(),
      password: userData.password.toString(),
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

module.exports = {
  createUser,
}