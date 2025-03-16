const requireAdmin = (req, res, next) => {
  if (!req.currentUser || req.currentUser.role !== 'admin') {
    return res.status(403).json({
      errors: [{ message: 'Not authorized' }]
    });
  }
  next();
};

module.exports = { requireAdmin }; 