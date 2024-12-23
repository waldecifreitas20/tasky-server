const getPath = require("path").resolve;
const { isValidToken } = require(getPath("utils/jwt.js"));
const { sendErrorResponse } = require(getPath("utils/messages.js"));
const { checkEmail, checkPassword } = require(getPath("utils/validations.js"));


async function checkUserSignUp(req, res, next) {
  if (!req.body) {
    return sendErrorResponse(res, 400, {
      error: "missing params",
      details: "request body must have username, email and password",
    });
  }

  const { username, email, password } = req.body;

  if (!username) {
    return sendErrorResponse(res, 400, {
      error: "missing params",
      details: "no username found in body request",
    });
  }

  try {
    checkEmail(email);
    checkPassword(password);
  } catch (error) {
    return sendErrorResponse(res, 400, {
      error: error.error,
      details: error.message
    });
  }

  return next();
}


async function checkUserToken(req, res, next) {
  if (!req.headers.authorization) {
    return sendErrorResponse(res, 401, {
      error: "Unauthorized",
      details: "no token was provided in headers",
    });
  }

  const token = req.headers.authorization;
  const [bearer, hash] = token.split(" ");

  if (bearer !== "Bearer") {
    return sendErrorResponse(res, 401, {
      error: "invalid token",
      details: "Access token is invalid or has expired"
    });
  }

  if (!isValidToken(hash)) {
    return sendErrorResponse(res, 401, {
      error: "invalid token",
      details: "Access token is invalid or has expired"
    });
  }
  return next();
}


function checkUserLogin(req, res, next) {
  const isEmptyBody = !req.body || Object.keys(req.body).length === 0;

  if (isEmptyBody) {
    return sendErrorResponse(res, 401, {
      error: "missing params",
      details: "Email and/or password missing",
    });
  }

  const { email, password } = req.body;

  try {
    checkEmail(email);
    checkPassword(password);
  } catch (error) {
    return sendErrorResponse(res, 401, {
      error: "Invalid credentials",
    });
  }

  return next();
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

