const { createTask, generateUser } = require("../api");


describe("It tests unexpected behavior for route that creates a new task into database", () => {

  test("Create new task with success", async () => {
    const { email, authorization } = await generateUser();

    const requestBody = {
      user_account: email,
      task: {
        name: "lalala",
        desc: "none",
        date: "06-05-2055",
        hour: "",
        whole_day: true,
      }
    }

    const { status } = await createTask(authorization, requestBody);
    expect(status).toBe(200);

  });

  test("Try to create new task without owner", async () => {
    const { authorization } = await generateUser();

    const requestBody = {
      task: {
        name: "lalala",
        desc: "none",
        date: "06-05-2055",
        hour: "",
        whole_day: true,
      }
    }

    const { status } = await createTask(authorization, requestBody);
    expect(status).toBe(400);

  });

  test("Try to create new task without name", async () => {
    const { email, authorization } = await generateUser();

    const requestBody = {
      user_account: email,
      task: {
        desc: "none",
        date: "06-05-2055",
        hour: "",
        whole_day: true,
      }
    }

    const { status } = await createTask(authorization, requestBody);
    expect(status).toBe(400);

  });

  test("Try to create new task without date", async () => {
    const { email, authorization } = await generateUser();

    const requestBody = {
      user_account: email,
      task: {
        name: "lalala",
        desc: "none",
        hour: "",
        whole_day: true,
      }
    }

    const { status } = await createTask(authorization, requestBody);
    expect(status).toBe(400);

  });

  test("Try to create new task without hour and whole_day param", async () => {
    const { email, authorization } = await generateUser();

    const requestBody = {
      user_account: email,
      task: {
        name: "lalala",
        desc: "none",
        date: "06-05-2055",
      }
    }

    const { status } = await createTask(authorization, requestBody);
    expect(status).toBe(400);

  });

  test("Try to create new task with valid email from another user", async () => {
    const { authorization: tokenUserA } = await generateUser();
    const { email: emailUserB } = await generateUser();

    const requestBody = {
      user_account: emailUserB,
      task: {
        name: "lalala",
        desc: "none",
        date: "06-05-2055",
        hour: "",
        whole_day: true,
      }
    }

    const { status } = await createTask(tokenUserA, requestBody);
    expect(status).toBe(400);

  });

  test("Try to create new task with fake token", async () => {
    const { email } = await generateUser();
    const fakeToken = `Bearer KsdG34T4sg#B54GDD.SDGEHEDGgfgeh2f3nsfgg`;

    const requestBody = {
      user_account: email,
      task: {
        name: "lalala",
        desc: "none",
        date: "06-05-2055",
        hour: "",
        whole_day: true,
      }
    }

    const { status } = await createTask(fakeToken, requestBody);
    expect(status).toBe(400);

  });

  test("Try to create new task with fake email", async () => {
    const { authorization } = await generateUser();

    const requestBody = {
      user_account: "fake-emailfake.com",
      task: {
        name: "lalala",
        desc: "none",
        date: "06-05-2055",
        hour: "",
        whole_day: true,
      }
    }

    const { status } = await createTask(authorization, requestBody);
    expect(status).toBe(401);

  });

});