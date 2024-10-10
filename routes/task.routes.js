const taskRouter = require("express").Router();

const { task } = require("./app.routes");
const { checkUserToken } = require("../api/middlewares/user.middleware");
const { checkRequiredParams, checkCredentials, checkTaskId, checkBodyTask } = require("../api/middlewares/task.middleware");
const controllers = require("../api/controllers/task.controller");


module.exports = app => {

  taskRouter.post(
    task.createTaskRoute,
    [
      checkUserToken,
      checkCredentials,
      checkRequiredParams
    ],
    controllers.createTask
  );

  taskRouter.get(
    task.allTasksRoute,
    checkUserToken,
    controllers.getTasks
  );

  taskRouter.patch(
    task.updateTaskRoute,
    [checkUserToken, checkTaskId, checkBodyTask],
    controllers.updateTask
  );

  taskRouter.delete(
    task.deleteTaskRoute,
    [checkUserToken, checkTaskId],
    controllers.deleteTask
  );

  app.use("/tasks", taskRouter);

}