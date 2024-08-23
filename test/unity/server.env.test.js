const { resolve: getPath } = require("path");
const { APP_PORT, APP_HOST } = require(getPath("config/server.env.js"));


describe("It should get none empty field at server environment variables", () => {

  test('Server host', () => {
    expect(!APP_HOST).toBe(false);
  });

  test('server port', () => {
    expect(!APP_PORT).toBe(false);
  });

});