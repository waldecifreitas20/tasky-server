const isMissingParams = (requestBody) => {
  const isBodyEmpty = !requestBody;
  const isBodyFull =
    !!requestBody.username
    && !!requestBody.email
    && !!requestBody.password

  return isBodyEmpty || !isBodyFull;
}

async function checkUserSignUpParams(req, res, next) {
  if (isMissingParams(req.body)) {
    return res.status(400).send({
      error: "missing params",
      message: "request body must have username, email and password",
    });
  }
  return next();
}

module.exports = { checkUserSignUpParams };

