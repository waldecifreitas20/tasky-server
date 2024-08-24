const postgres = require("postgres");

const DATABASE_CONFIG = require("../config/database.env");

module.exports = postgres(DATABASE_CONFIG);
