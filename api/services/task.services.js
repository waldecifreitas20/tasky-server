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
      { message: "Task creation has failed" }
    );
  }
}


async function getAll(token) {

  try {
    const hash = token.split(" ")[1]
    const { email } = extractToken(hash);

    const tasks = await taskRepo.getTasksByUser(email);
    console.log(tasks);

    return responseMessage(200, undefined, { tasks });
  } catch (error) {
    console.log(error);

    return errorResponse(502,
      "Several Error",
      { message: "Cannot get task by now. Unknown error has been occurred" }
    );

  }
}


module.exports = {
  createTask,
  getAll
}
