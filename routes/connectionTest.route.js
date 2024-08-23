const { connectionTestController } = require("../api/controllers/connectionTest.controller");
const { testConnectionRoute } = require("./app.routes");

module.exports = (app) => {
  app.get(testConnectionRoute, connectionTestController);
}