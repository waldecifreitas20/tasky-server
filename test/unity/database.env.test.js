const databaseEnv = require("../../config/database.env");


describe("It should get none empty field at database configuration variables", () => {
  /* host
database
username
password
port */
  test('Database host', () => {
    expect(!databaseEnv.host).toBe(false);
  });
  
  test('Database name', () => {
    expect(!databaseEnv.database).toBe(false);
  });
  
  test('Database username', () => {
    expect(!databaseEnv.username).toBe(false);
  });
  
  test('Database password', () => {
    console.log(databaseEnv);
    
    expect(!databaseEnv.password).toBe(false);
  });

});