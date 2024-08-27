const getPath = require("path").resolve;
const { signUp } = require("../requester");


describe("It should test sign up process", () => {

  test("User sign up with success", async () => {
    const username = `user-${Math.random()}`;
    const email = `${username}@fakeemail.com`;
    const password = "13246587121";

    await signUp(username, email, password)
      .then(response => {
        expect(response.status).toBe(200);
      })
  });

  test("User does not fill the form", async () => {
    const username = ``;
    const email = ``;
    const password = "";

    await signUp(username, email, password)
      .then(response => {
        expect(response.status).toBe(400);
      })
  });

  test("User does not provide their name", async () => {
    const username = '';
    const email = `${username}@fakeemail.com`;
    const password = "13246587121";

    await signUp(username, email, password)
      .then(response => {
        expect(response.status).toBe(400);
      })
  });

  test("User email has already been signed up", async () => {
    const username = `user-${Math.random()}`;
    const email = `${username}@fakeemail.com`;
    const password = "13246587121";
    /* sign up first */
    await signUp(username, email, password)
      .then(response => {
        expect(response.status).toBe(200);
      });

    /* try to sign up again */
    await signUp(username, email, password)
      .then(response => {
        expect(response.status).toBe(400);
      });
  });

  test("User email does not is valid", async () => {
    const username = `user-${Math.random()}`;
    const email = `${username}fakeemailcom`;
    const password = "13246587121";

    await signUp(username, email, password)
      .then(response => {
        expect(response.status).toBe(400);
      });
  });

  test("User does not provide their password", async () => {
    const username = `user-${Math.random()}`;
    const email = `${username}@fakeemail.com`;
    const password = "";

    await signUp(username, email, password)
      .then(response => {
        expect(response.status).toBe(400);
      });
  });

});