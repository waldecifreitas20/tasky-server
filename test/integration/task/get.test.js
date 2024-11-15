const { getTasks, generateUser, autoCreateTask } = require("../api");


describe("It checks user trying to get their tasks from server ", () => {

  test("Test 1: Get all tasks from an user with success", async () => {
    const { authorization, email } = await generateUser();

    await autoCreateTask(authorization);
    await autoCreateTask(authorization);
    await autoCreateTask(authorization);

    const { status, body } = await getTasks(authorization);
    console.log(status);
    
    expect(status).toBe(200);
    expect(body.tasks.length).toBe(3);
  });

  test("Test 2: Get 0 tasks from an user who has not create any task", async () => {
    const { authorization } = await generateUser();

    const { status, body } = await getTasks(authorization);

    expect(status).toBe(200);
    expect(body.tasks.length).toBe(0);
  });

  test("Test 3: Get tasks without token", async () => {
    const { status, body } = await getTasks('');

    expect(status).toBe(401);
  });

});