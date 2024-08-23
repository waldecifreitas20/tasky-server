const getPath = require("path").resolve;
const req = require("../requester");

const { testConnectionRoute } = require(getPath("routes", "app.routes.js"))

describe("It should test if server is online", () => {
  
  test("Server online", async () => {
    return req
      .get(testConnectionRoute)
      .then((response) => {
        expect(response.status).toBe(200);
      });
  });
  
});