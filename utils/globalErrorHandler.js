const globalErrorHandler = (err, req, res, next) => {
  console.log("Global error handler is working!");
  console.log(err);
  res.status(404).json({
    status: "error",
    data: err,
  });
};
module.exports = globalErrorHandler;
