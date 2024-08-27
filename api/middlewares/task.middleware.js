const getPath = require("path").resolve;

const { sendErrorResponse } = require(getPath("utils/messages"));
const { isInvalidEmail } = require(getPath("utils/validations.js"));
const { extractToken } = require(getPath("utils/jwt.js"));

const hasRequiredParams = task => {
  if (!task) return false;

  if (!task.name || !task.date) {
    return false;
  }

  if (task.date.length !== 10) {
    return false
  }

  if (task.date.charAt(2) != "-" || task.date.charAt(5) != "-") {
    return false;
  }

  if (!task.hour && !task.whole_day) {
    return false;
  }

  return true;
}

const isSameEmail = (token, email) => {
  const decode = extractToken(token);
  return decode.email === email;
}


function checkTaskParams(req, res, next) {
  const email = req.body.user_account;
  const token = req.headers.authorization.split(" ")[1];

  if (isInvalidEmail(email) || !isSameEmail(token, email)) {
    return sendErrorResponse(res, 400, { error: "invalid account informed" })
  }

  if (!hasRequiredParams(req.body.task)) {
    return sendErrorResponse(res, 400, {
      error: "missing required params",
      message: `Required params are $name $date. $hour and $whole_day must not be both null`
    });
  }

  return next();
}


module.exports = {
  checkTaskParams,
}