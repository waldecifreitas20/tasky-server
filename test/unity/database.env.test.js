const databaseEnv = require("../../config/database.env");

test('It should get none empty field at database environment variables', () => {
  
  expect(!databaseEnv.DB_USER).toBe(false);
});