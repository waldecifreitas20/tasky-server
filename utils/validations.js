function isInvalidEmail(email) {
  if (!email || email.length < 8) {
    return true;
  }

  const hasAtSign = email.indexOf("@") != -1;
  const hasDot = email.indexOf(".") != -1;

  return !hasAtSign || !hasDot;
}


function checkEmail(email) {
  if (!email) {
    throw {
      code: "MISSING_EMAIL",
      message: "No email sent"
    };
  }

  const hasAtSign = email.indexOf("@") != -1;
  if (!hasAtSign) {
    throw {
      code: "MISSING_AT_SIGN",
      message: "Email must have AT sign, e.g., @gmail.com, @outlook.com",
    };
  }

  const hasDot = email.indexOf(".") != -1;
  if (!hasDot) {
    throw {
      code: "MISSING_DOT",
      message: "Email must have '.'(dot), e.g., .com, .br, .uk",
    };
  }

}

function isInvalidPassword(password) {
  if (!password) {
    return true;
  }

  return password.length < 8 || password.length > 16
}


function checkPassword(password) {
  if (!password) {
    throw {
      code: "MISSING_PASSWORD",
      message: "No password found",
    };
  }

  const isValidLength = password.length >= 8 && password.length <= 16;
  
  if (!isValidLength) {
    throw {
      code: "INVALID_LENGTH",
      message: "Password length must be between 8 and 16 characters",
      length_found: password.length,
    };
  }

}

module.exports = {
  isInvalidEmail,
  isInvalidPassword,
  checkEmail,
  checkPassword,
}