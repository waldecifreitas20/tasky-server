const taskServices = require("../services/task.services");

async function createTask(req, res) {
  const task = req.body;
  const { authorization } = req.headers
  const taskData = {
    task_name: task.name,
    description: task.desc || null,
    date: task.date,
    hour: task.full_day? null : task.hour,
    is_all_day: task.full_day || false,
  }
  
  const response = await taskServices.createTask(taskData, authorization);

  return res
    .status(response.httpStatus)
    .json(response.body);
}

async function updateTask(req, res) {
  const { authorization } = req.headers;
  const { id } = req.params;
  const task = req.body;

  const taskData = {
    task_name: task.name,
    description: task.desc,
    date: task.date,
    hour: task.hour,
    is_all_day: task.full_day,
    belongs_to: req.body.user_account
  }

  const response = await taskServices
    .updateTask(
      id,
      taskData,
      authorization
    );

  return res
    .status(response.httpStatus)
    .json(response.body);
}

async function deleteTask(req, res) {
  const { id } = req.params;
  const { authorization } = req.headers;

  const response = await taskServices.deleteTask(id, authorization);

  return res
    .status(response.httpStatus)
    .json(response.body);
}

async function getTasks(req, res) {
  const { authorization } = req.headers;
  const response = await taskServices.getAll(authorization);

  return res
    .status(response.httpStatus)
    .json(response.body);
}


module.exports = {
  createTask,
  updateTask,
  deleteTask,
  getTasks,
}
