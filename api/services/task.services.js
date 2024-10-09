const taskRepo = require("../repositories/task.repository");
const { responseMessage, errorResponse } = require("../../utils/messages");
const { extractToken } = require("../../utils/jwt");

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
    await taskRepo.deleteTask(id);
    
    return responseMessage(204);
  } catch (error) {
    console.log(error);

    return errorResponse(502, "Several Error");
  }
}


module.exports = {
  createTask,
  deleteTask,
  getAll
}
