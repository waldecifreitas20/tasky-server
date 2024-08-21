const userRepo = require("../repositories/user.respository");

async function createUser(userData) {

  try {

    await userRepo.createUser({
      username: userData.username.toString(),
      email: userData.email.toString(),
      password: userData.password.toString(),
    });

    return {
      statusCode: 200,
      body: {
        message: "user account has been created with success",
        access_token: `Bearer fake_token_${Math.random()}`
      }
    }

  } catch (error) {
    console.log(error);

    return {
      statusCode: 500,
      body: {
        error: "several error",
        message: "user sign up has failed"
      }
    }
  }

}

module.exports = {
  createUser,
}