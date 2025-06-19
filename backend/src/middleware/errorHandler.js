const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);
  
  // TypeORM validation errors
  if (err.name === 'QueryFailedError') {
    return res.status(400).json({
      success: false,
      error: 'Database query failed',
      message: err.message
    });
  }
  
  // JSON parsing errors
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      success: false,
      error: 'Invalid JSON format'
    });
  }
  
  // Default error response
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = errorHandler;