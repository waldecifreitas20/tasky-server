const userServices = require("../services/user.services");

async function signUpUser(req, res) {

  try {
    const userData = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    }

    const response = await userServices.createUser(userData);

    res.cookie("authorization", response.body.authorization, {
      maxAge: 3600 * 1000, // 1 hour
      httpOnly: true
    });

    return res
      .status(response.httpStatus)
      .json(response.body);

  } catch (error) {
    console.error(error);

    return res
      .status(500)
      .json({ error: "Unexpected error occurred. Try again later" });
  }

}


async function checkToken(req, res) {
  return res
    .status(200)
    .json({ message: "token is valid" })
}


async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const response = await userServices.login(email, password);

    res.cookie("authorization", response.body.authorization, {
      maxAge: 3600 * 1000, // 1 hour
      httpOnly: true
    });

    return res
      .status(response.httpStatus)
      .json(response.body);

  } catch (error) {
    console.error(error);

    return res
      .status(500)
      .json({ error: "Unexpected error occurred. Try again later" });
  }
}

async function loginGoogle(req, res) {
  try {
    const response = await userServices.loginWithGoogle(req.headers.authorization);

    return res
      .status(response.httpStatus)
      .json(response.body);
  } catch (error) {
    console.error(error);

    return res
      .status(500)
      .json({ error: "Unexpected error occurred. Try again later" });
  }

}

module.exports = {
  signUpUser,
  checkToken,
  loginUser,
  loginGoogle
}