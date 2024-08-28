const { resolve: getPath } = require("path");

const app = require(getPath("app.js"));
const http = require("supertest")(app);


module.exports = { 
  http 
};