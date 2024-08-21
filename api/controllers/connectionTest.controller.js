async function connectionTestController(req, res) {
  return res.status(200).send({ message: "Api is accepting connections" });
}

module.exports = {
  connectionTestController,
}