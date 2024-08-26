const getPath = require("path").resolve;
const http = require("../requester");

const jwt = require(getPath("utils/jwt.js"));
const { checkTokenRoute } = require(getPath("routes/app.routes.js")).user;


describe("It should test if token has been checked correctly", () => {

  test("Token is valid and get status 200", async () => {
    const token = jwt.generateToken({ username: "any", email: "test@test.com" });

    await http
      .get(`/user${checkTokenRoute}`)
      .set("authorization", token)
      .then(res => {
        expect(res.status).toBe(200);
      })
  });

  test("Token without Bearer", async () => {
    const token = jwt.generateToken({ username: "any", email: "test@test.com" });

    await http
      .get(`/user${checkTokenRoute}`)
      .set("authorization", token.split(" ")[1])
      .then(res => {
        expect(res.status).toBe(401);
      })
  });

  test("Empty token", async () => {
    const token = "";

    await http
      .get(`/user${checkTokenRoute}`)
      .set("authorization", token)
      .then(res => {
        expect(res.status).toBe(401);
      })
  });

  test("Fake token", async () => {
    const token = Math.random().toString();

    await http
      .get(`/user${checkTokenRoute}`)
      .set("authorization", token)
      .then(res => {
        expect(res.status).toBe(401);
      })
  });

});