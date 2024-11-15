const { createTask, generateUser } = require("../api");


describe("It tests unexpected behavior for route that creates a new task into database", () => {

  test("Test 1: Create new task with success", async () => {
    const { authorization } = await generateUser();

    const task = {
      name: "lalala",
      desc: "none",
      date: "2020-01-20",
      hour: "",
      full_day: true,
    }

    const { status } = await createTask(authorization, task);
    expect(status).toBe(200);

  });

  test("Test 2: Try to create new task without name", async () => {
    const { authorization } = await generateUser();

    const task = {
      desc: "none",
      date: "2020-01-20",
      hour: "",
      full_day: true,
    }

    const { status } = await createTask(authorization, task);
    expect(status).toBe(400);

  });

  test("Test 3: Try to create new task without date", async () => {
    const { authorization } = await generateUser();

    const task = {
      name: "lalala",
      desc: "none",
      hour: "",
      full_day: true,
    }

    const { status } = await createTask(authorization, task);
    expect(status).toBe(400);

  });

  test("Test 4: Try to create new task without hour and full_day param", async () => {
    const { authorization } = await generateUser();

    const task = {
      name: "lalala",
      desc: "none",
      date: "2020-01-20",
    }

    const { status } = await createTask(authorization, task);
    expect(status).toBe(400);

  });

  test("Test 5: Try to create new task with fake token", async () => {
    const fakeToken = `Bearer KsdG34T4sg#B54GDD.SDGEHEDGgfgeh2f3nsfgg`;

    const task = {
      name: "lalala",
      desc: "none",
      date: "2020-01-20",
      hour: "",
      full_day: true,
    }

    const { status } = await createTask(fakeToken, task);
    expect(status).toBe(401);

  });

});