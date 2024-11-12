const taskRepo = require("../repositories/task.repository");
const userRepo = require("../repositories/user.repository");
const { responseMessage, errorResponse } = require("../../utils/messages");
const { extractToken } = require("../../utils/jwt");


const getUserFromToken = (token) => {
  const tokenWithoutBearer = token.split(" ")[1]
  return extractToken(tokenWithoutBearer);
}

/* ================ SERVICES ================*/

async function createTask(taskData, token) {
  try {
    const { email } = getUserFromToken(token);
    const { user_id } = await userRepo.getUserByEmail(email);

    await taskRepo.createTask(taskData, user_id);

    return responseMessage(200, "task created");
  } catch (error) {
    console.log(error);

    return errorResponse(502,
      "Internal Error",
      { error: "Task creation has failed" }
    );
  }
}

async function getAll(token) {
  try {
    const { email } = getUserFromToken(token);

    const tasks = await taskRepo.getTasksByUser(email);

    return responseMessage(200, undefined, { tasks });
  } catch (error) {
    console.log(error);

    return errorResponse(502,
      "Internal Error",
      { error: "Cannot get task by now. Unknown error has been occurred" }
    );
  }
}

async function deleteTask(taskId, token) {
  try {
    const { email } = getUserFromToken(token);

    // CHECK TASK EXISTENCE BEFORE TRY TO UPDATE
    if (!await taskRepo.hasTask(email, taskId)) {
      return errorResponse(404, "Task not found");
    }

    await taskRepo.deleteTask(taskId);
    return responseMessage(204);
  } catch (error) {
    console.log(error);

    return errorResponse(502,
      "Internal Error",
      { error: "Cannot delete task by now. Unknown error has been occurred" }
    );
  }
}

async function updateTask(taskId, taskData, token) {
  try {
    const { email } = getUserFromToken(token);

    // CHECK TASK EXISTENCE BEFORE TRY TO UPDATE
    if (!await taskRepo.hasTask(email, taskId)) {
      return errorResponse(404, "Task not found");
    }

    // FILTER VALID FILTER FROM
    const getValidFields = () => {
      const entries = Object.entries(taskData);
      const validFields = {};

      for (const [key, value] of entries) {
        if (!!value) {
          validFields[key] = value;
        }
      }
      return validFields;
    }

    await taskRepo.updateTask(taskId, email, getValidFields());

    return responseMessage(200, "Ok");
  } catch (error) {
    console.log(error);

    return errorResponse(502,
      "Internal Error",
      { error: "An error has been ocurred. Task has not been updated" }
    );
  }
}


module.exports = {
  createTask,
  deleteTask,
  getAll,
  updateTask
}
