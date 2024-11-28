const throwError = (statusCode, name, message) => {
  throw {
    code: statusCode,
    name: name,
    message: message,
  }
}

const responseMessage = (httpStatus, message, options = {}) => {
  return {
    httpStatus,
    body: {
      message,
      ...options
    }
  }
}

const errorResponse = (httpStatus, error, details) => {
  return {
    httpStatus,
    body: {
      error,
      details,
    }
  }
}

const sendErrorResponse = (res, httpStatus, { error, details }) => {
  return res
    .status(httpStatus)
    .json({ error, details })
}


module.exports = {
  throwError,
  responseMessage,
  errorResponse,
  sendErrorResponse
}