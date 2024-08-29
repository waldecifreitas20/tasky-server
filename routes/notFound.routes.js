const { notFound } = require("../api/controllers/notFound.controller");
const { notFoundRoute } = require("./app.routes");

module.exports = app => {

  app.get(notFoundRoute, notFound);
  app.put(notFoundRoute, notFound);
  app.post(notFoundRoute, notFound);
  app.patch(notFoundRoute, notFound);
  app.delete(notFoundRoute, notFound);

}