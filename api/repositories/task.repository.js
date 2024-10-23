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

async function updateTask(taskId, owner, updates) {
  return await TaskModel.update(taskId, owner, updates);
}

async function hasTask(userPk, taskId) {
  return await TaskModel.isOwner(taskId, userPk);
}


module.exports = {
  deleteTask,
  createTask,
  getTaskById,
  getTasksByUser,
  updateTask,
  hasTask,
}