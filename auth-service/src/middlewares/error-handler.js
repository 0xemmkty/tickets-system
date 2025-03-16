const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      errors: Object.values(err.errors).map(error => ({
        message: error.message
      }))
    });
  }

  res.status(500).json({
    errors: [{ message: 'Something went wrong' }]
  });
};

module.exports = { errorHandler }; 