const { generateUser, deleteTask, autoCreateTask, getRandomTask } = require("../api");

describe("It checks task deleting requests possibilities", () => {

  test("Delete a task with sucess", async () => {
    const { authorization, email } = await generateUser();

    /* await autoCreateTask(authorization, email);
    const { id } = await getRandomTask(authorization);  */     
    const { status, body } = await deleteTask(authorization, 120);
    console.log(body);
    
    expect(status).toBe(204);
  });

});