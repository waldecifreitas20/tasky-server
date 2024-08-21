require("dotenv").config();

module.exports = {
  DB_HOST: process.env.PGHOST,
  DB_NAME: process.env.PGDATABASE,
  DB_USER: process.env.PGUSER,
  DB_PASSWORD: process.env.PGPASSWORD,
  DB_ENDPOINT_ID: process.env.ENDPOINT_ID,
}