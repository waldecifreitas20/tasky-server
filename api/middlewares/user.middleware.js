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


async function checkUserSignUpParams(req, res, next) {
  if (isMissingParams(req.body)) {
    return res.status(400).send({
      error: "missing params",
      message: "request body must have username, email and password",
    });
  }

  if (isInvalidEmail(req.body.email)) {
    return res.status(400).send({
      error: "invalid email",
      message: "user email is not valid",
    });
  }
  return next();
}

module.exports = { checkUserSignUpParams };

