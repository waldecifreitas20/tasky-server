const postgres = require("postgres");

const dbEnvs = require("../config/database.env");

dbEnvs.DB_PASSWORD = decodeURIComponent(dbEnvs.DB_PASSWORD);

const sql = postgres({
  host: dbEnvs.DB_HOST,
  database: dbEnvs.DB_NAME,
  username: dbEnvs.DB_USER,
  password: dbEnvs.DB_PASSWORD,
  port: "5432",
  ssl: "require",
  connection: {
    options: `project=${dbEnvs.DB_ENDPOINT_ID}`
  }
});

module.exports = sql;