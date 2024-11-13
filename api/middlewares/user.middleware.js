const getPath = require("path").resolve;
const { isValidToken } = require(getPath("utils/jwt.js"));
const { sendErrorResponse } = require(getPath("utils/messages.js"));
const { isInvalidEmail, isInvalidPassword } = require(getPath("utils/validations.js"));


async function checkUserSignUp(req, res, next) {
  if (!req.body) {
    return sendErrorResponse(res, 400, {
      error: "missing params",
      message: "request body must have username, email and password",
    });
  }

  const { username, email, password } = req.body;

  if (!username || isInvalidEmail(email) || isInvalidPassword(password)) {
    return sendErrorResponse(res, 400, {
      error: "invalid params",
      message: "email, username and/or password are not valid",
    });
  }

  return next();
}


async function checkUserToken(req, res, next) {
  if (!req.headers.authorization) {
    return sendErrorResponse(res, 401, {
      error: "Unauthorized",
      message: "no token was provided in headers",
    });
  }

  const token = req.headers.authorization;
  const [bearer, hash] = token.split(" ");

  if (bearer !== "Bearer") {
    return sendErrorResponse(res, 401, {
      error: "invalid token",
      message: "Access token is invalid or has expired"
    });
  }

  if (!isValidToken(hash)) {
    return sendErrorResponse(res, 401, {
      error: "invalid token",
      message: "Access token is invalid or has expired"
    });
  }
  return next();
}


function checkUserLogin(req, res, next) {
  if (!req.body) {
    return sendErrorResponse(res, 401, {
      error: "missing params",
      message: "Email and/or password missing",
    });
  }

  const { email, password } = req.body;

  if (isInvalidEmail(email) || isInvalidPassword(password)) {
    return sendErrorResponse(res, 401, {
      error: "Invalid credentials",
    });
  }

  next();
}

function checkGoogleAuth(req, res, next) {
  console.log(req.headers.authorization);
  
  if (!req.headers.authorization) {
    return sendErrorResponse(res, 400, {
      error: "No token provided"
    });
  }

  return next();
}


module.exports = {
  checkUserSignUp,
  checkUserLogin,
  checkUserToken,
  checkGoogleAuth,
};

