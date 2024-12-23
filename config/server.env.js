require("dotenv").config();

module.exports = {
  APP_HOST: process.env.SERVER_HOST,
  APP_PORT: process.env.SERVER_PORT,
  API_KEY: process.env.API_KEY,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
}