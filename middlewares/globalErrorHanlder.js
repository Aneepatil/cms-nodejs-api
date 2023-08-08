export const globalErrorHanlder = (error, req, res, next) => {
  // Stack
  const stack = error.stack;
  // Message
  const message = error.message;
  // Status
  const status = error.status ? error.status : "Failed";
  // StatusCode
  const statusCode = error.statusCode ? error.statusCode : 500;

  res.status(statusCode).json({ status, message, stack });
};

// Not Found

export const notFound = (req, res, next) => {
  const err = new Error(`Can not find ${req.originalUrl} on the server.`);
  next(err);
};
