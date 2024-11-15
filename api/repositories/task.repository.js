const { TaskModel } = require("../models/Task.js")

async function createTask(task, userPk) {
  await TaskModel.create(task, userPk);
}

async function getTasksByUser(userPk) {
  return await TaskModel.getByOwner(userPk);
}

async function deleteTask(taskId, userPk) {
  return await TaskModel.delete(taskId, userPk);
}

async function updateTask(taskId, userPk, updates) {
  return await TaskModel.update(taskId, userPk, updates);
}

async function hasTask(taskId, userPk) {
  return await TaskModel.isOwner(taskId, userPk);
}


module.exports = {
  deleteTask,
  createTask,
  getTasksByUser,
  updateTask,
  hasTask,
}