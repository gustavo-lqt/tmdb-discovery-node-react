// Central error handler — all errors passed via next(err) land here
export function errorHandler(err, req, res, next) {
  console.error("Error: ", err.message);
  res.status(500).json({ error: "Something went wrong" });
}
