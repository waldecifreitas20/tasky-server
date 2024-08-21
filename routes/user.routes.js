const userRouter = require("express").Router();

const userControllers = require("../api/controllers/user.controller");
const userMiddlewares = require("../api/middlewares/user.middleware");


module.exports = (app) => {
  userRouter.post("/sign-up", userMiddlewares.checkUserSignUpParams, userControllers.signUpUser);

  app.use("/user", userRouter);
}