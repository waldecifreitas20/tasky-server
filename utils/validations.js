function isInvalidEmail(email) {
  if (!email) {
    return true;
  }
  const hasAtSign = email.indexOf("@") != -1;
  const hasDot = email.indexOf(".") != -1;

  return !hasAtSign || !hasDot;
}

function isInvalidPassword(password) {
  if (!password) {
    return true;
  }

  return password.length < 8 || password.length > 16
}


module.exports = {
  isInvalidEmail,
  isInvalidPassword,
}