const taskServices = require("../services/task.services");

async function createTask(req, res) {
  const task = req.body.task;
  const token = req.headers.authorization;
  const email = req.body.user_account;

  const taskData = {
    task_name: task.name,
    description: task.desc,
    date: task.date,
    hour: task.hour,
    is_all_day: task.full_day | false,
    belongs_to: req.body.user_account
  }

  const response = await taskServices.createTask(email, taskData, token);

  return res
    .status(response.httpStatus)
    .json(response.body);
}


async function updateTask(req, res) {
  return res
    .status(200)
    .json({ msg: "ok" });
}


async function deleteTask(req, res) {
  return res
    .status(200)
    .json({ msg: "ok" });
}


async function getTasks(req, res) {
  return res
    .status(200)
    .json({ msg: "ok" });
}


module.exports = {
  createTask,
  updateTask,
  deleteTask,
  getTasks,
}
