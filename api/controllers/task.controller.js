function createTask(req, res) {
  return res
    .status(200)
    .send({ msg: "ok" });
}

function updateTask(req, res) {
  return res
    .status(200)
    .send({ msg: "ok" });
}

function deleteTask(req, res) {
  return res
    .status(200)
    .send({ msg: "ok" });
}

function getTasks(req, res) {
  return res
    .status(200)
    .send({ msg: "ok" });
}


module.exports = {
  createTask,
  updateTask,
  deleteTask,
  getTasks,
}
