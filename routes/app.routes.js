module.exports = {
  testConnectionRoute: "/test-connection",
  user: {
    signUpRoute: "/sign-up",
    checkTokenRoute: "/check-token",
    loginRoute: "/login",
    googleAuthRoute: "/google-auth"
  },
  task: {
    createTaskRoute: "/create",
    updateTaskRoute: "/update/:id",
    deleteTaskRoute: "/delete/:id",
    allTasksRoute: "/all",
  },
  notFoundRoute: "/*",
}