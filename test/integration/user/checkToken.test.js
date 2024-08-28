const getPath = require("path").resolve;
const { checkToken } = require("../api");

const jwt = require(getPath("utils/jwt.js"));


describe("It should test if token has been checked correctly", () => {

  test("Token is valid and get status 200", async () => {
    const token = jwt.generateToken({ username: "any", email: "test@test.com" });

    await checkToken(token)
      .then(res => {
        expect(res.status).toBe(200);
      })
  });

  test("Token without Bearer", async () => {
    const [bearer, token] = jwt.generateToken({
      username: "any", email: "test@test.com"
    }).split(" ");

    await checkToken(token)
      .then(res => {
        expect(res.status).toBe(401);
      })
  });

  test("Empty token", async () => {
    const token = "";

    await checkToken(token)
      .then(res => {
        expect(res.status).toBe(401);
      })
  });

  test("Fake token", async () => {
    const token = Math.random().toString();

    await checkToken(token)
      .then(res => {
        expect(res.status).toBe(401);
      })
  });

});