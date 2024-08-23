const userServices = require("../services/user.services");

async function signUpUser(req, res) {
  console.log("Request to register a new user received");

  try {
    const userData = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    }

    const response = await userServices.createUser(userData);

    return res
      .status(response.statusCode)
      .send(response.body);

  } catch (error) {
    console.error(error);

    return res
      .status(500)
      .send({ error: "Unexpected error occurred. Try again later" });
  }

}

module.exports = {
  signUpUser,
}