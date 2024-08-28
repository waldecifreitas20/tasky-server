async function connectionTestController(req, res) {
  return res
    .status(200)
    .json({ message: "Api is accepting connections" });
}

module.exports = {
  connectionTestController,
}