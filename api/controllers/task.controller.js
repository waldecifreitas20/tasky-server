const taskServices = require("../services/task.services");

async function createTask(req, res) {
  const { task } = req.body;

  const taskData = {
    task_name: task.name,
    description: task.desc,
    date: task.date,
    hour: task.hour,
    is_all_day: task.full_day | false,
    belongs_to: req.body.user_account
  }

  const response = await taskServices.createTask(taskData);

  return res
    .status(response.httpStatus)
    .json(response.body);
}

async function updateTask(req, res) {

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
  
  const response = await taskServices.updateTask(id, taskData);

  return res
    .status(response.httpStatus)
    .json(response.body);
}

async function deleteTask(req, res) {
  const { id } = req.params;
  const response = await taskServices.deleteTask(id);

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
