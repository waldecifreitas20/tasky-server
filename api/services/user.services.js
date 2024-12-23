const getPath = require("path").resolve;

const userRepo = require("../repositories/user.repository");

const { generateToken } = require(getPath("utils/jwt"));
const { errorResponse, responseMessage } = require(getPath("utils/messages"));
const { verifyAccount } = require("../externals/googleAuth");
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
      {
        authorization: token,
        username: userData.username
      }
    );

  } catch (error) {
    if (error.code == "23505") {
      return errorResponse(400, "User account already exists");
    }
    return errorResponse(502, "Several Error", "Create user process has failed");
  }
}


async function login(email, password) {
  try {
    const user = await userRepo.getUserByEmail(email);

    const isSamePassword = bcrypt.checkPassword(user.password, password);

    if (!isSamePassword) {
      return errorResponse(401, "Invalid credentials");
    }

    const token = generateToken({ email, username: user.username });

    return responseMessage(
      200, "login succeed",
      { username: user.username, authorization: token }
    );

  } catch (error) {
    if (error.code === "59123") {
      return errorResponse(401, "Invalid credentials");
    }
    return errorResponse(502, "Several Error", "Login attempt has failed");
  }
}

async function loginWithGoogle(googleToken) {
  try {
    const { user, isValidToken } = await verifyAccount(googleToken);

    if (!isValidToken) {
      return errorResponse(401, "Invalid google credentials");
    }

    
    if (await userRepo.hasUser(user.email)) {
      return await login(user.email, user.sub);
    }

    return await createUser({
      email: user.email,
      password: user.sub,
      username: user.name
    });

  } catch (error) {
    console.log(error);
    return errorResponse(502, "Invalid google credentials");
  }
}
module.exports = {
  createUser,
  login,
  loginWithGoogle
}