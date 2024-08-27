const getPath = require("path").resolve;
const { http, signUp } = require("../requester");

const { loginRoute } = require(getPath("routes/app.routes.js")).user;


async function login(email, password) {
  return await http
    .post(`/user${loginRoute}`)
    .send({ email, password });
}


describe("It checks login route", () => {

  test("Login with success", async () => {
    const username = `user-${Math.random()}`;
    const email = `test-${username}@email.com`;
    const password = "12345678";

    await signUp(username, email, password);

    await login(email, password).then(res => {
      expect(res.status).toBe(200);
    });

  });

  test("login with invalid email", async () => {
    const username = `user-${Math.random()}`;
    const email = `test-${username}@email.com`;
    const password = "12345678";

    await signUp(username, 'test@mailcom', password);

    await login(email, password).then(res => {

      expect(res.status).toBe(401);
    });

  });

  test("Login without email", async () => {
    const username = `user-${Math.random()}`;
    const email = `test-${username}@email.com`;
    const password = "12345678";

    await signUp(username, '', password);

    await login(email, password).then(res => {
      expect(res.status).toBe(401);
    });

  });

  test("Login with wrong password", async () => {
    const username = `user-${Math.random()}`;
    const email = `test-${username}@email.com`;
    const password = "12345678";

    await signUp(username, email, password);

    await login(email, "asdasd5asd8").then(res => {
      expect(res.status).toBe(401);
    });

  });

  test("Login without password", async () => {
    const username = `user-${Math.random()}`;
    const email = `test-${username}@email.com`;
    const password = "12345678";

    await signUp(username, email, '');

    await login(email, password).then(res => {
      expect(res.status).toBe(401);
    });
  });

  test("Login without email and password", async () => {
    const username = `user-${Math.random()}`;
    const email = `test-${username}@email.com`;
    const password = "12345678";

    await signUp(username, '', '');

    await login(email, password).then(res => {
      expect(res.status).toBe(401);
    });
  });

});