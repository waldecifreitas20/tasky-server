const { connectionTestController } = require("../api/controllers/connectionTest.controller");

module.exports = (app) => {
  app.get("/test-connection", connectionTestController);
}