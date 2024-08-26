const throwError = (statusCode, name, message) => {
  throw {
    code: statusCode,
    name: name,
    message: message,
  }
}

const responseMessage = (httpStatus, message, options = {}) => {
  return {
    statusCode: httpStatus,
    body: {
      message,
      ...options
    }
  }
}

const errorResponse = (httpStatus, error, details) => {
  return {
    statusCode: error.code,
    body: {
      error,
      details,
    }
  }
}


module.exports = {
  throwError,
  responseMessage,
  errorResponse
}