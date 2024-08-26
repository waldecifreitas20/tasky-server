const taskServices = require("../services/task.services");

async function createTask(req, res) {
  const taskData = {
    task_name: req.body.task_name,
    description: req.body.description,
    date: req.body.date,
    hour: req.body.hour,
    is_all_day: req.body.is_all_day,
    belongs_to: req.body.belongs_to
  }

  const response = await taskServices.createTask(req.body.email, taskData);
  return res
    .status(response.statusCode)
    .send(response.body);
}


async function updateTask(req, res) {
  return res
    .status(200)
    .send({ msg: "ok" });
}


async function deleteTask(req, res) {
  return res
    .status(200)
    .send({ msg: "ok" });
}


async function getTasks(req, res) {
  return res
    .status(200)
    .send({ msg: "ok" });
}


module.exports = {
  createTask,
  updateTask,
  deleteTask,
  getTasks,
}
