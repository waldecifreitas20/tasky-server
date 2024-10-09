const express = require("express");
const app = express();

const cors = require("cors");

app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(cors());

require('./routes/connectionTest.route')(app);
require('./routes/user.routes')(app);
require('./routes/task.routes')(app);
require('./routes/notFound.routes')(app);


module.exports = app;