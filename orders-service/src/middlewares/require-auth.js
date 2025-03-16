const jwt = require('jsonwebtoken');
const config = require('../config');

const requireAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log('Auth header:', authHeader); // 添加调试日志

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('No auth header or invalid format'); // 添加调试日志
      return res.status(401).json({
        errors: [{ message: 'Not authenticated' }]
      });
    }

    const token = authHeader.split(' ')[1];
    console.log('Token:', token); // 添加调试日志

    const payload = jwt.verify(token, config.jwt.secret);
    console.log('Token payload:', payload); // 添加调试日志

    req.currentUser = payload;
    next();
  } catch (err) {
    console.error('Auth error:', {
      name: err.name,
      message: err.message,
      stack: err.stack
    });
    res.status(401).json({
      errors: [{ 
        message: 'Not authenticated',
        details: err.message 
      }]
    });
  }
};

module.exports = { requireAuth }; 