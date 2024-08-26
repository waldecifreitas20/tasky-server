const { TaskModel } = require("../models/Task.js")

async function createTask(userPk, task) {
  await TaskModel.create(userPk, task);
}


module.exports = {
  createTask,
}