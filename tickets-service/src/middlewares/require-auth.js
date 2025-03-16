const jwt = require('jsonwebtoken');
const config = require('../config');

const requireAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        errors: [{ message: 'Not authorized' }]
      });
    }

    const token = authHeader.split(' ')[1];
    const payload = jwt.verify(token, config.jwtKey);
    
    req.currentUser = payload;
    next();
  } catch (err) {
    return res.status(401).json({
      errors: [{ message: 'Not authorized' }]
    });
  }
};

module.exports = { requireAuth }; 