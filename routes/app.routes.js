module.exports = {
  testConnectionRoute: "/test-connection",
  user: {
    signUpRoute: "/sign-up",
    checkTokenRoute: "/check-token",
    loginRoute: "/login"
  },
  task: {
    createTaskRoute: "/create",
    updateTaskRoute: "/update/:id",
    deleteTaskRoute: "/delete/:id",
    allTasksRoute: "/all",
  },
  notFoundRoute: "/*",
}