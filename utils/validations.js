function checkEmail(email) {
  if (!email) {
    throw {
      error: "missing email",
      message: "No email sent"
    };
  }

  const hasAtSign = email.indexOf("@") != -1;
  if (!hasAtSign) {
    throw {
      error: "missing at sign",
      message: "Email must have AT sign, e.g., @gmail.com, @outlook.com",
    };
  }

  const hasDot = email.indexOf(".") != -1;
  if (!hasDot) {
    throw {
      error: "missing a dot",
      message: "Email must have '.'(dot), e.g., .com, .br, .uk",
    };
  }

}

function checkPassword(password) {
  if (!password) {
    throw {
      error: "missing password",
      details: "No password found",
    };
  }

  const isValidLength = password.length >= 8 && password.length <= 16;
  
  if (!isValidLength) {
    throw {
      error: "invalid length",
      details: "Password must have between 8 and 16 characters",
    };
  }

}

module.exports = {
  checkEmail,
  checkPassword,
}