const { generateUser, login } = require("../api");


describe("It checks login route", () => {

  test("Login with success", async () => {
    const { email, password } = await generateUser();

    await login(email, password)
      .then(res => {
        expect(res.status).toBe(200);
      });

  });

  test("login with invalid email", async () => {
    const { password } = await generateUser();

    await login("testgeamil.com", password)
      .then(res => {
        expect(res.status).toBe(401);
      });

  });

  test("Login without email", async () => {
    const { password } = await generateUser();

    await login(undefined, password).then(res => {
      expect(res.status).toBe(401);
    });

  });

  test("Login with wrong password", async () => {
    const { email } = await generateUser();

    await login(email, "asdasd5asd8").then(res => {
      expect(res.status).toBe(401);
    });

  });

  test("Login without password", async () => {
    const { email } = await generateUser();

    await login(email, undefined).then(res => {
      expect(res.status).toBe(401);
    });
  });

  test("Login without email and password", async () => {
    
    await login().then(res => {
      expect(res.status).toBe(401);
    });
  });

});