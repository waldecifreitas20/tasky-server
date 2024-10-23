const taskRepo = require("../repositories/task.repository");
const { responseMessage, errorResponse } = require("../../utils/messages");
const { extractToken } = require("../../utils/jwt");

const hasTask = async (id) => {
  const task = await taskRepo.getTaskById(id);
  const hasTask = task.length !== 0;

  return hasTask;
}

const getUserFromToken = (token) => {
  const tokenWithoutBearer = token.split(" ")[1]
  return extractToken(tokenWithoutBearer);
}

async function createTask(taskData) {
  try {
    await taskRepo.createTask(taskData);

    return responseMessage(200, "task created");
  } catch (error) {
    console.log(error);

    return errorResponse(502,
      "Several Error",
      { error: "Task creation has failed" }
    );
  }
}

async function getAll(token) {

  try {
    const hash = token.split(" ")[1]
    const { email } = extractToken(hash);

    const tasks = await taskRepo.getTasksByUser(email);

    return responseMessage(200, undefined, { tasks });
  } catch (error) {
    console.log(error);

    return errorResponse(502,
      "Several Error",
      { error: "Cannot get task by now. Unknown error has been occurred" }
    );

  }
}

async function deleteTask(id) {
  try {
    if (!await hasTask(id)) {
      return errorResponse(404, "Task not found");
    }

    await taskRepo.deleteTask(id);
    return responseMessage(204);
  } catch (error) {
    console.log(error);

    return errorResponse(502, "Several Error");
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
    return responseMessage(400, "Deu merda");

  }

}


module.exports = {
  createTask,
  deleteTask,
  getAll,
  updateTask
}
