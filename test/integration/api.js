const getPath = require("path").resolve;

const { http } = require("./requester");
const { loginRoute } = require(getPath("routes/app.routes.js")).user;
const { checkTokenRoute } = require(getPath("routes/app.routes.js")).user;

const { createTaskRoute, allTasksRoute } = require(getPath("routes/app.routes.js")).task;

/* USERS */
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

/* TASKS */
async function autoCreateTask(token) {
  return await createTask(token, {
      name: "lalala",
      desc: "none",
      date: "2020-01-20",
      hour: "",
      full_day: true,
  });
}

async function createTask(token, task) {
  return await http
    .post(`/tasks${createTaskRoute}`)
    .set("authorization", token)
    .send(task);
}

async function deleteTask(token, taskId) {
  return await http
    .delete(`/tasks/delete/${taskId}`)
    .set("authorization", token);
}

async function getTasks(token) {
  return await http
    .get(`/tasks${allTasksRoute}`)
    .set("authorization", token)
    .send();
}

async function updateTask(token, taskId, updates) {
  return await http
    .patch(`/tasks/update/${taskId}`)
    .set("authorization", token)
    .send(updates);
}

async function getRandomTask(token) {
  const { body } = await getTasks(token);
 
  return body.tasks[0];
}

module.exports = {
  generateUser,
  signUp,
  login,
  checkToken,
  createTask,
  autoCreateTask,
  getTasks,
  getRandomTask,
  deleteTask,
  updateTask,
}