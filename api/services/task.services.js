const taskRepo = require("../repositories/task.repository");
const { responseMessage, errorResponse } = require("../../utils/messages");

async function createTask(userEmail, taskData, token) {
  try {
    await taskRepo.createTask(userEmail, taskData);

    return responseMessage(200, "task created");
  } catch (error) {
    console.log(error);

    return responseMessage(502,
      "Several Error",
      { details: "Task creation has failed" }
    );
  }
}


module.exports = {
  createTask,
}
