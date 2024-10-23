const {
  updateTask,
  generateUser,
  createTask,
  getRandomTask,
} = require("../api");


describe("It tests unexpected behavior for route that creates a new task into database", () => {

  test("1: Update all task data with success", async () => {
    const { authorization, email } = await generateUser();

    const task = {
      name: "lalala",
      desc: "none",
      date: "2020-07-01",
      full_day: true
    }

    await createTask(authorization, {
      user_account: email,
      task,
    });

    task.name = "new name";
    task.desc = "new description";
    task.date = "2023-07-01";
    task.full_day = false;
    task.hour = "03:45";

    const { id } = await getRandomTask(authorization);
    const { status } = await updateTask(authorization, id, task);

    expect(status).toBe(200);
  });

  test("2: Update task name with success", async () => {

  });

  test("3: Update task description with success", async () => { });

  test("4: Update task date with success", async () => { });

  test("5: Update task hour with success", async () => { });

  test("6: Set task with period of full day", async () => { });

  test("7: Try to update task without send task id", async () => { });

  test("8: Try to update task of another user", async () => { });

  test("9: Try to update task without name", async () => { });

  test("10: Try to update task without date", async () => { });

  test("11: Try to update task without set a period", async () => { });

});