const { TaskModel } = require("../models/Task.js")

async function createTask(task, userPk) {
  await TaskModel.create(task, userPk);
}

async function getTasksByUser(userPk) {
  return await TaskModel.getByOwner(userPk);
}

async function deleteTask(id, userPk) {
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
  getTasksByUser,
  updateTask,
  hasTask,
}