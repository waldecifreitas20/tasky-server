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
    if (!hasRequiredParams(req.body)) {
      return sendErrorResponse(res, 400, {
        error: "missing required params",
        message: `Required params are $name $date. $hour and $full_day must not be both null`
      });
    }

    return next();
  },

  checkTaskId: (req, res, next) => {
    const id = req.params.id;

    if (!id || isNaN(id)) {
      return sendErrorResponse(res, 400, { error: "Invalid id sent" })
    }

    next();
  },

  checkBodyTask: (req, res, next) => {
    const task = req.body;
    const errorResponse = {
      error: "No valid params has been sent",
      message: "at least one of these following params " +
        "is required: name, desc, date, hour or full_day "
    };

    if (!task) {
      return sendErrorResponse(res, 400, errorResponse);
    }  

    if (!task.name && !task.desc &&
      !task.hour && !task.full_day && !task.date
    ) {
      return sendErrorResponse(res, 400, errorResponse);
    }

    if (!!task.date) {      
      const isInvalidDate = task.date.length !== 10 ||
      task.date.charAt(4) != "-" ||
      task.date.charAt(7) != "-";
      
      if (isInvalidDate) {
        return sendErrorResponse(res, 400, errorResponse);
      }
    }

    return next();
  }
}