function errorHandler(err, req, res, next) {
  console.error(err);
  if (res.headersSent) return next(err);
  res.status(err.status || 500).render("errors/500", {
    title: "Something went wrong",
    message: process.env.NODE_ENV === "production" ? "Please try again later." : err.message
  });
}
module.exports = { errorHandler };
