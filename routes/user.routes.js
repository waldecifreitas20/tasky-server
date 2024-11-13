const userRouter = require("express").Router();

const userControllers = require("../api/controllers/user.controller");
const userMiddlewares = require("../api/middlewares/user.middleware");
const { user } = require("./app.routes");

module.exports = (app) => {

  userRouter.get(
    user.checkTokenRoute,
    userMiddlewares.checkUserToken,
    userControllers.checkToken
  );
  
  userRouter.post(
    user.signUpRoute,
    userMiddlewares.checkUserSignUp,
    userControllers.signUpUser
  );
  userRouter.post(
    user.loginRoute,
    userMiddlewares.checkUserLogin,
    userControllers.loginUser
  );
  userRouter.post(
    user.googleAuthRoute,
    userMiddlewares.checkGoogleAuth,
    userControllers.loginGoogle
  );


  app.use("/user", userRouter);
}