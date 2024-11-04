const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();
const { GOOGLE_CLIENT_ID } = require("../../config/server.env.js");


async function verifyAccount(googleToken) {
  try {

    const ticket = await client.verifyIdToken({
      idToken: googleToken,
      audience: GOOGLE_CLIENT_ID
    });
    console.log(ticket.getPayload().sub);

    const { sub, email, name } = ticket.getPayload();
    return {
      isValidToken: true,
      user: {
        email, name, sub
      }
    };

  } catch (error) {
    console.log(error);
    return false;

  }


}

module.exports = {
  verifyAccount
}