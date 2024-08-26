const taskRouter = require("express").Router();

const { task } = require("./app.routes");
const { checkUserToken } = require("../api/middlewares/user.middleware");
const controllers = require("../api/controllers/task.controller");


module.exports = app => {

  taskRouter.post(task.createTaskRoute, checkUserToken, controllers.createTask);
  
  taskRouter.get(task.allTasksRoute, checkUserToken, controllers.getTasks);
  
  taskRouter.patch(task.updateTaskRoute, checkUserToken, controllers.updateTask);
  
  taskRouter.delete(task.deleteTaskRoute, checkUserToken, controllers.deleteTask);

  app.use("/tasks", taskRouter);

}