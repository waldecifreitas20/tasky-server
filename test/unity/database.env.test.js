const databaseEnv = require("../../config/database.env");


describe("It should get none empty field at database environment variables", () => {
  
  test('Database host', () => {
    expect(!databaseEnv.DB_HOST).toBe(false);
  });
  
  test('Database name', () => {
    expect(!databaseEnv.DB_NAME).toBe(false);
  });
  
  test('Database username', () => {
    expect(!databaseEnv.DB_USER).toBe(false);
  });
  
  test('Database password', () => {
    expect(!databaseEnv.DB_PASSWORD).toBe(false);
  });

  test('Database endpoint id', () => {
    expect(!databaseEnv.DB_ENDPOINT_ID).toBe(false);
  });

});