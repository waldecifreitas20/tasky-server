const userRouter = require("express").Router();

const userControllers = require("../api/controllers/user.controller");
const userMiddlewares = require("../api/middlewares/user.middleware");
const { user } = require("./app.routes");

module.exports = (app) => {
  
  userRouter.post(user.signUpRoute, userMiddlewares.checkUserSignUpParams, userControllers.signUpUser);

  app.use("/user", userRouter);
}