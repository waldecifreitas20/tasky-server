const { UserModel } = require("../models/User")
const { throwError } = require("../../utils/messages");

async function createUser(userData) {

  try {
    return await UserModel.create(userData);
  } catch (error) {
    console.log(error);

    if (error.code == "23505") {
      throwError(400, "duplicated account", "User account already exists");
    }

    throwError(502, "several error", "Unknown error at database");
  }
}

async function getUserByPk(email) {
  try {
    const result = await UserModel.getByPk(email);

    if (result.length == 0) {
      throwError(401, "Invalid credentials");
    }
    return result[0];
  } catch (error) {

    if (error.code === 401) {
      throw error;
    }

    throwError(502, "several error", "Unknown error at database");
  }
}

module.exports = {
  createUser,
  getUserByPk,
}