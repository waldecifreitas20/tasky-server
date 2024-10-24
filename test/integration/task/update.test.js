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
    const { authorization, email } = await generateUser();

    const task = {
      name: "task",
      date: "2020-07-01",
      full_day: true
    }

    await createTask(authorization, {
      user_account: email,
      task,
    });

    task.name = "new name";

    const { id } = await getRandomTask(authorization);
    await updateTask(authorization, id, task);
    const updatedTask = await getRandomTask(authorization);

    expect(updatedTask.name).toBe(task.name);
  });

  test("3: Update task description with success", async () => {
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

    task.desc = "new description";

    const { id } = await getRandomTask(authorization);
    await updateTask(authorization, id, task);
    const updatedTask = await getRandomTask(authorization);

    expect(updatedTask.desc).toBe(task.desc);
  });

  test("4: Update task date with success", async () => {
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

    task.date = "2023-07-01";

    const { id } = await getRandomTask(authorization);
    await updateTask(authorization, id, task);
    const updatedTask = await getRandomTask(authorization);

    expect(updatedTask.date).toBe(task.date);
  });

  test("5: Update task hour with success", async () => {
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

    task.full_day = false;
    task.hour = "03:45";

    const { id } = await getRandomTask(authorization);
    await updateTask(authorization, id, task);
    const updatedTask = await getRandomTask(authorization);

    expect(updatedTask.hour).toBe(task.hour);
  });

  test("6: Set task with period as full day", async () => {
    const { authorization, email } = await generateUser();

    const task = {
      name: "lalala",
      desc: "none",
      date: "2020-07-01",
      full_day: false,
      hour: "03:45"
    }

    await createTask(authorization, {
      user_account: email,
      task,
    });

    task.full_day = true;

    const { id } = await getRandomTask(authorization);
    await updateTask(authorization, id, task);
    const updatedTask = await getRandomTask(authorization);

    expect(updatedTask.full_day).toBe(task.full_day);
  });

  test("7: Try to update task without send task id", async () => {
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

    const id = null;
    const { status } = await updateTask(authorization, id, task);
    expect(status).toBe(400);
  });

  test("8: Try to update task of another user", async () => {
    const userA = await generateUser();
    const userB = await generateUser();

    const task = {
      name: "lalala",
      desc: "none",
      date: "2020-07-01",
      full_day: true
    }

    await createTask(userA.authorization, {
      user_account: userA.email,
      task: task,
    });

    task.name = "new name";
    task.desc = "new description";
    task.date = "2023-07-01";
    task.full_day = false;
    task.hour = "03:45";

    const { id } = await getRandomTask(userA.authorization);
    const { status } = await updateTask(userB.authorization, id, task);

    expect(status).toBe(404);
  });

});