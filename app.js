const express = require("express");
const app = express();

app.use(express.urlencoded({extended:  false}))
app.use(express.json());

require('./routes/connectionTest.route')(app);
require('./routes/user.routes')(app);


module.exports = app;