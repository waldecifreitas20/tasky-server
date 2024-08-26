const getPath = require("path").resolve;

const userRepo = require("../repositories/user.respository");

const { generateToken } = require(getPath("utils/jwt"));
const { errorResponse, responseMessage } = require(getPath("utils/messages"));
const bcrypt = require(getPath("utils/bcrypt"));

async function createUser(userData) {

  try {

    const hash = bcrypt.generatePassword(userData.password);

    await userRepo.createUser({
      username: userData.username.toString(),
      email: userData.email.toString(),
      password: hash.toString(),
    });

    const token = generateToken({ username: userData.username, email: userData.email });

    return responseMessage(
      200,
      "user account has been created with success",
      { authorization: token }
    );

  } catch (error) {

    return errorResponse(error.code, {
      httpStatus: error.code,
      body: {
        error: error.name,
        message: error.message,
      }
    });
  }

}



async function login(email, password) {
  try {
    const user = await userRepo.getUserByPk(email);

    const isSamePassword = bcrypt.checkPassword(user.password, password);

    if (!isSamePassword) {
      throwError(401, "Invalid credentials");
    }

    const token = generateToken({ email, username: user.username });

    return responseMessage(
      200, undefined,
      { authorization: token }
    );

  } catch (error) {
    return {
      httpStatus: error.code,
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