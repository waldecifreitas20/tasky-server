const userServices = require("../services/user.services");

async function signUpUser(req, res) {

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


async function checkToken(req, res) {
  return res
    .status(200)
    .send({ message: "token is valid" })
}


async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const response = await userServices.login(email, password);

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
  checkToken,
  loginUser
}