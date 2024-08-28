function notFound(_, res) {
  return res
    .status(404)
    .json({ message: "Route does not exist" });
}


module.exports = { notFound }