const { getTasks, generateUser, autoCreateTask } = require("../api");


describe("It checks user trying to get their tasks from server ", () => {

  test("Get all tasks from an user with success", async () => {
    const { authorization, email } = await generateUser();

    await autoCreateTask(authorization, email);
    await autoCreateTask(authorization, email);
    await autoCreateTask(authorization, email);

    const { status, body } = await getTasks(authorization);

    expect(status).toBe(200);
    expect(body.tasks.length).toBe(3);
  });

  test("Get 0 tasks from an user who has not create any task", async () => {
    const { authorization } = await generateUser();

    const { status, body } = await getTasks(authorization);

    expect(status).toBe(200);
    expect(body.tasks.length).toBe(0);
  });

  test("Get tasks without token", async () => {
    const { status, body } = await getTasks('');

    expect(status).toBe(401);
  });

});