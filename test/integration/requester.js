const { resolve: getPath } = require("path");

const app = require(getPath("app.js"));
const http = require("supertest")(app);

async function signUp(username, email, password) {
  return await http.post(`/user/sign-up`)
    .send({ username, email, password })
}

module.exports = { 
  http, 
  signUp 
};