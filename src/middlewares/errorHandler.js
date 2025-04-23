const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);
  
  // Default error
  let statusCode = 500;
  let message = 'Internal Server Error';
  
  // Handle specific error types
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = err.message;
  } else if (err.code === 'ER_DUP_ENTRY') {
    statusCode = 409;
    message = 'A resource with that information already exists';
  } else if (err.code === 'ER_NO_SUCH_TABLE') {
    statusCode = 500;
    message = 'Database table does not exist';
  }
  
  res.status(statusCode).json({
    status: 'error',
    message: message
  });
};

module.exports = errorHandler;
