const successResponse = (res, data, message, statusCode = 200) => {
  res.status(statusCode).json({
    success: true,
    data,
    message,
  });
};

const errorResponse = (res, error, message, statusCode = 500) => {
  res.status(statusCode).json({
    success: false,
    error,
    message,
  });
};

const validationError = (res, message, statusCode = 400) => {
  res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = { successResponse, errorResponse, validationError };
