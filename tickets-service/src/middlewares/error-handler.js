const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({
      errors: err.errors.map(error => ({
        message: error.message
      }))
    });
  }

  res.status(500).json({
    errors: [{ message: 'Something went wrong' }]
  });
};

module.exports = { errorHandler }; 