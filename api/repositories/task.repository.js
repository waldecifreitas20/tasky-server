const { TaskModel } = require("../models/Task.js")

async function createTask(task) {
  await TaskModel.create(task);
}

async function getTasksByUser(userPk) {
  return await TaskModel.getByOwner(userPk);
}

async function getTaskById(id) {
  return await TaskModel.getById(id);
}

async function deleteTask(id) {
  return await TaskModel.delete(id);
}

async function updateTask(taskId, updates) {
  return await TaskModel.update(taskId, updates);
}


module.exports = {
  deleteTask,
  createTask,
  getTaskById,
  getTasksByUser,
  updateTask
}