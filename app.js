const express = require("express");
const app = express();

require('./routes/connectionTest.route')(app);

module.exports = app;