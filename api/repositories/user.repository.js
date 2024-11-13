const { UserModel } = require("../models/User");

async function createUser(userData) {
  return await UserModel.create(userData);
}

async function getUserByEmail(email) {
  const result = await UserModel.getByEmail(email);

  if (result.length == 0) {
    throw { code: "59123" };
  }

  return result[0];
}

module.exports = {
  createUser,
  getUserByEmail,
}