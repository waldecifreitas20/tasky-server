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

const sendErrorResponse = (res, httpStatus, { error, message }) => {
  return res
    .status(httpStatus)
    .json({ error, message })
}


module.exports = {
  throwError,
  responseMessage,
  errorResponse,
  sendErrorResponse
}