const getPath = require("path").resolve;
const { isValidToken } = require(getPath("utils/jwt.js"));

const isMissingParams = (requestBody) => {
  const isBodyEmpty = !requestBody;
  const isBodyFull =
    !!requestBody.username
    && !!requestBody.email
    && !!requestBody.password

  return isBodyEmpty || !isBodyFull;
}

const isInvalidEmail = (email) => {
  const hasAtSign = email.indexOf("@") != -1;
  const hasDot = email.indexOf(".") != -1;

  return !hasAtSign || !hasDot;
}

const errorResponse = (res, status, { error, message }) => {
  return res
    .status(status)
    .send({ error, message })
}


async function checkUserSignUp(req, res, next) {
  if (isMissingParams(req.body)) {
    return errorResponse(res, 400, {
      error: "missing params",
      message: "request body must have username, email and password",
    });
  }

  if (isInvalidEmail(req.body.email)) {
    return errorResponse(res, 400, {
      error: "invalid email",
      message: "user email is not valid",
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
  next();
}

module.exports = {
  checkUserSignUp,
  checkUserLogin,
  checkUserToken,
};

