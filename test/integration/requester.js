const { resolve: getPath } = require("path");

const app = require(getPath("app.js"));
const requester = require("supertest");

module.exports = requester(app);