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

async function hasUser(email) {
  try {
    const user = await getUserByEmail(email)
    console.log(user);
    
    return true;
  } catch (error) {
    return false;
  }
}

module.exports = {
  createUser,
  getUserByEmail,
  hasUser,
}