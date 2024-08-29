const { http } = require("../requester");

describe("It checks if api are handling unknown routes", () => {

  test("Using GET", async () => {
    const { status } = await http.get("/sdfdasdasf");
    expect(status).toBe(404);
  });
  
 
  test("Using POST", async () => {
    const { status } = await http.post("/sdfdasdasf");
    expect(status).toBe(404);
  });
  
  test("Using DELETE", async () => {
    const { status } = await http.delete("/sdfdasdasf");
    expect(status).toBe(404);
  });

  test("Using PUT", async () => {
    const { status } = await http.put("/sdfdasdasf");
    expect(status).toBe(404);
  });

  test("Using PATCH", async () => {
    const { status } = await http.patch("/sdfdasdasf");
    expect(status).toBe(404);
  });

});

describe("It checks if api are handling unknown routes for users", () => {

  test("Using GET at user", async () => {
    const { status } = await http.get("/user/sdfdasdasf");
    expect(status).toBe(404);
  });
  
 
  test("Using POST at user", async () => {
    const { status } = await http.post("/user/sdfdasdasf");
    expect(status).toBe(404);
  });
  
  test("Using DELETE at user", async () => {
    const { status } = await http.delete("/user/sdfdasdasf");
    expect(status).toBe(404);
  });

  test("Using PUT at user", async () => {
    const { status } = await http.put("/user/sdfdasdasf");
    expect(status).toBe(404);
  });

  test("Using PATCH at user", async () => {
    const { status } = await http.patch("/user/sdfdasdasf");
    expect(status).toBe(404);
  });

});

describe("It checks if api are handling unknown routes for task", () => {

  test("Using GET at tasks", async () => {
    const { status } = await http.get("/tasks/sdfdasdasf");
    expect(status).toBe(404);
  });
  
 
  test("Using POST at tasks", async () => {
    const { status } = await http.post("/tasks/sdfdasdasf");
    expect(status).toBe(404);
  });
  
  test("Using DELETE at tasks", async () => {
    const { status } = await http.delete("/tasks/sdfdasdasf");
    expect(status).toBe(404);
  });

  test("Using PUT at tasks", async () => {
    const { status } = await http.put("/tasks/sdfdasdasf");
    expect(status).toBe(404);
  });

  test("Using PATCH at tasks", async () => {
    const { status } = await http.patch("/tasks/sdfdasdasf");
    expect(status).toBe(404);
  });

});