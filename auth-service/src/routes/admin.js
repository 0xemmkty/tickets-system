const express = require('express');
const { requireAuth } = require('../middlewares/require-auth');
const { requireAdmin } = require('../middlewares/require-admin');
const { User } = require('../models');

const router = express.Router();

// 获取所有用户
router.get('/users',
  requireAuth,
  requireAdmin,
  async (req, res) => {
    try {
      const users = await User.findAll({
        attributes: ['id', 'email', 'role', 'status', 'createdAt', 'lastLogin']
      });
      res.json(users);
    } catch (err) {
      res.status(400).json({
        errors: [{ message: 'Error fetching users' }]
      });
    }
  }
);

// 更新用户角色
router.patch('/users/:id/role',
  requireAuth,
  requireAdmin,
  async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({
          errors: [{ message: 'User not found' }]
        });
      }

      user.role = req.body.role;
      await user.save();
      res.json(user);
    } catch (err) {
      res.status(400).json({
        errors: [{ message: 'Error updating user role' }]
      });
    }
  }
);

// 更新用户状态
router.patch('/users/:id/status',
  requireAuth,
  requireAdmin,
  async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({
          errors: [{ message: 'User not found' }]
        });
      }

      user.status = req.body.status;
      await user.save();
      res.json(user);
    } catch (err) {
      res.status(400).json({
        errors: [{ message: 'Error updating user status' }]
      });
    }
  }
);

module.exports = router; 