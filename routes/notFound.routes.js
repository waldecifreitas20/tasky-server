const { notFound } = require("../api/controllers/notFound.controller");

module.exports = app => {

  app.get("/*", notFound);
  app.put("/*", notFound);
  app.post("/*", notFound);
  app.patch("/*", notFound);
  app.delete("/*", notFound);
  
}