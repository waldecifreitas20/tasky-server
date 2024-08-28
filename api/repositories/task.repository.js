const { TaskModel } = require("../models/Task.js")

async function createTask(task) {
  console.log(task);
  
  await TaskModel.create(task);
}

async function getTasksByUser(userPk) {
  return await TaskModel.getByFk(userPk);
}


module.exports = {
  createTask,
  getTasksByUser
}