const getPath = require("path").resolve;
const { sendErrorResponse } = require(getPath("utils/messages"));
const { isInvalidEmail } = require(getPath("utils/validations.js"));

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

function checkTaskParams(req, res, next) {

  if (isInvalidEmail(req.body.user_account)) {
    return sendErrorResponse(res, 400, {error: "no valid user account provided"})
  }

  if (!hasRequiredParams(req.body.task)) {
    return sendErrorResponse(res, 400, {error: "missing required params"})
  }
  

  return next();
}


module.exports = {
  checkTaskParams,
}