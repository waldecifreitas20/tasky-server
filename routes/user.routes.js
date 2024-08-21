const userRouter = require("express").Router();
const userControllers = require("../api/controllers/user.controller");


module.exports = (app) => {
  userRouter.post("/sign-up", userControllers.signUpUser);

  app.use("/user", userRouter);
}