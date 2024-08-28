const getPath = require("path").resolve;

const { http } = require("./requester");
const { createTaskRoute } = require(getPath("routes/app.routes.js")).task;
const { loginRoute } = require(getPath("routes/app.routes.js")).user;
const { checkTokenRoute } = require(getPath("routes/app.routes.js")).user;


async function checkToken(token) {
  return await http
    .get(`/user${checkTokenRoute}`)
    .set("authorization", token);
}

async function login(email, password) {
  return await http
    .post(`/user${loginRoute}`)
    .send({ email, password });
}

async function signUp(username, email, password) {
  return await http.post(`/user/sign-up`)
    .send({ username, email, password })
}

async function createTask(token, body) {
  return await http
    .post(`/tasks${createTaskRoute}`)
    .set("authorization", token)
    .send(body)
}

async function generateUser() {
  const username = `user-${Math.random()}`;
  const email = `test-${username}@email.com`;
  const password = `13245678`;

  const { authorization } = await signUp(
    username,
    email,
    password
  ).then(res => res.body);

  return { username, email, password, authorization }
}


module.exports = {
  signUp,
  login,
  createTask,
  generateUser,
  checkToken
}