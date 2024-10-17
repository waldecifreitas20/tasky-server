const postgres = require("postgres");
const DATABASE_CONFIG = require("../config/database.env");

const sql =  postgres(DATABASE_CONFIG);

module.exports = { sql };
