const app = require('./app');
const APP_PORT = 8080;

app.listen(APP_PORT, () => {
  console.log(`SERVER LISTENING AT ${APP_PORT}`);
});