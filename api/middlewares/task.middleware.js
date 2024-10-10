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

  if (task.date.charAt(4) != "-" || task.date.charAt(7) != "-") {
    return false;
  }

  if (!task.hour && !task.full_day) {
    return false;
  }

  return true;
}

const isSameEmail = (token, email) => {
  const decode = extractToken(token);
  return decode.email === email;
}


module.exports = {
  checkRequiredParams: (req, res, next) => {
    if (!hasRequiredParams(req.body.task)) {
      return sendErrorResponse(res, 400, {
        error: "missing required params",
        message: `Required params are $name $date. $hour and $full_day must not be both null`
      });
    }

    return next();
  },

  checkCredentials: (req, res, next) => {
    const email = req.body.user_account;
    const token = req.headers.authorization.split(" ")[1];


    if (isInvalidEmail(email) || !isSameEmail(token, email)) {
      return sendErrorResponse(res, 400, { error: "invalid account informed" })
    }

    return next();
  },

  checkTaskId: (req, res, next) => {
    const id = req.params.id;

    if (!id || isNaN(id)) {
      return sendErrorResponse(res, 400, {error: "Invalid id sent"})      
    }

    next();
  }
}