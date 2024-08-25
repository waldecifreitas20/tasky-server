const throwError = (statusCode, name, message) => {
  throw {
    code: statusCode,
    name: name,
    message: message,
  }
}


module.exports = {
  throwError,
}