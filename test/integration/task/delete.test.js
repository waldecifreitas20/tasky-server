const { generateUser, deleteTask, autoCreateTask, getRandomTask } = require("../api");

describe("It checks task deleting requests possibilities", () => {

  test("Delete a task with sucess", async () => {
    const { authorization, email } = await generateUser();

    await autoCreateTask(authorization, email);
    const { id } = await getRandomTask(authorization);      
    const { status } = await deleteTask(authorization, id);
    
    expect(status).toBe(204);
  });
  
  test("Try to delete a task without token", async () => {
    const { authorization, email } = await generateUser();

    await autoCreateTask(authorization, email);
    const { id } = await getRandomTask(authorization);      
    const { status } = await deleteTask(null, id);
    
    expect(status).toBe(401);
  });
  
  test("Try to delete a task that does not exist", async () => {
    const { authorization } = await generateUser();    
    const { status } = await deleteTask(authorization, -1);
    
    expect(status).toBe(404);
  });
  
  test("Try to delete a task twice", async () => {
    const { authorization, email } = await generateUser();

    await autoCreateTask(authorization, email);
    const { id } = await getRandomTask(authorization);      
    const { status: statusA } = await deleteTask(authorization, id);
    const { status: statusB } = await deleteTask(authorization, id);
    
    expect(statusA).toBe(204);
    expect(statusB).toBe(404);
  });

  test("Try to delete a task without id", async () => {
    const { authorization } = await generateUser();    
    const { status } = await deleteTask(authorization, null);
    
    expect(status).toBe(400);
  });
  
  test("Try to delete a task without id", async () => {
    const { authorization } = await generateUser();    
    const { status } = await deleteTask(authorization, 'asdg');
    
    expect(status).toBe(400);
  });

});