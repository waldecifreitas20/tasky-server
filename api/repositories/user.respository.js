const { UserModel } = require("../models/User")
const { throwError } = require("../../utils/messages");

async function createUser(userData) {
  return await UserModel.create(userData);
}

async function getUserByPk(email) {
  const result = await UserModel.getByPk(email);

  if (result.length == 0) {
    throw { code: "59123" };
  }

  return result[0];
}

module.exports = {
  createUser,
  getUserByPk,
}