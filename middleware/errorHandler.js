module.exports = (err, req, res, next) => {
  console.error(err.stack);

  let statusCode = 500;
  let message = "Internal server error. Please try again later.";

  if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    statusCode = 400;
    message = "";

    const errors = err.errors.map((error) => {
      switch (error.type) {
        case "notNull Violation":
          return `${error.path} is required.`;
        case "unique violation":
          return `${error.path} already exists.`;
        case "Validation error":
          return error.message;
        default:
          return error.message;
      }
    });

    message += errors.join(", ");
  } else if (err.name === "SequelizeDatabaseError") {
    statusCode = 400;
    message = "Database error occurred.";
  } else if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid or expired authentication token.";
  } else if (err.status) {
    statusCode = err.status;
    message = err.message;
  }

  res.status(statusCode).json({ error: message, statusCode });
};
