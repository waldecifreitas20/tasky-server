const isDevMode = process.env.NODE_ENV == "dev"

require("dotenv").config({
  path: isDevMode ? ".env.dev" : ".env"
});

const BASE_CONFIG = {
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  port: "5432",
}

const PRODUCTION_ENV = {
  ...BASE_CONFIG,
  ssl: "require",
  connection: {
    options: `project=${process.env.ENDPOINT_ID}`
  }
}


module.exports = isDevMode ? BASE_CONFIG : PRODUCTION_ENV;