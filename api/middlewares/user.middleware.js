const getPath = require("path").resolve;
const { isValidToken } = require(getPath("utils/jwt.js"));


const isInvalidEmail = email => {
  if (!email) {
    return true;
  }
  const hasAtSign = email.indexOf("@") != -1;
  const hasDot = email.indexOf(".") != -1;

  return !hasAtSign || !hasDot;
}

const isInvalidPassword = password => {
  if (!password) {
    return true;
  }

  return password.length < 8 || password.length > 16
}

const errorResponse = (res, status, { error, message }) => {
  return res
    .status(status)
    .send({ error, message })
}



async function checkUserSignUp(req, res, next) {
  if (!req.body) {
    return errorResponse(res, 400, {
      error: "missing params",
      message: "request body must have username, email and password",
    });
  }

  const { username, email, password } = req.body;

  if (!username || isInvalidEmail(email) || isInvalidPassword(password)) {
    return errorResponse(res, 400, {
      error: "invalid params",
      message: "email, username and/or password are not valid",
    });
  }

  return next();
}



async function checkUserToken(req, res, next) {
  if (!req.headers.authorization) {
    return errorResponse(res, 401, {
      error: "Unauthorized",
      message: "no token was provided in headers",
    });
  }

  const token = req.headers.authorization;
  const [bearer, hash] = token.split(" ");

  if (bearer !== "Bearer") {
    return errorResponse(res, 401, {
      error: "invalid token",
      message: "Access token is invalid or has expired"
    });
  }

  if (!isValidToken(hash)) {
    return errorResponse(res, 401, {
      error: "invalid token",
      message: "Access token is invalid or has expired"
    });
  }
  return next();
}



function checkUserLogin(req, res, next) {
  if (!req.body) {
    return errorResponse(res, 400, {
      error: "missing params",
      message: "Email and/or password missing",
    });
  }

  const { email, password } = req.body;

  if (isInvalidEmail(email) || isInvalidPassword(password)) {
    return errorResponse(res, 400, {
      error: "Invalid credentials",
    });
  }

  next();
}



module.exports = {
  checkUserSignUp,
  checkUserLogin,
  checkUserToken,
};

