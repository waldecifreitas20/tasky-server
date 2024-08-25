const userRouter = require("express").Router();

const userControllers = require("../api/controllers/user.controller");
const userMiddlewares = require("../api/middlewares/user.middleware");
const { user } = require("./app.routes");

module.exports = (app) => {

  userRouter.get(user.checkToken, userMiddlewares.checkUserToken, userControllers.checkToken);

  userRouter.post(user.signUpRoute, userMiddlewares.checkUserSignUp, userControllers.signUpUser);
  userRouter.post(user.login, userMiddlewares.checkUserLogin, userControllers.loginUser);


  app.use("/user", userRouter);
}