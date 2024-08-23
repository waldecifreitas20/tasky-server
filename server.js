const app = require('./app');

const {APP_PORT} = require("./config/server.env");

app.listen(APP_PORT, () => {
  console.log(`SERVER LISTENING AT ${APP_PORT}`);
});