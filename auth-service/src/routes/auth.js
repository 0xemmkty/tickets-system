const express = require('express');
const jwt = require('jsonwebtoken');
const { body } = require('express-validator');
const { User } = require('../models');
const { validateRequest } = require('../middlewares/validate-request');
const config = require('../config');

const router = express.Router();

router.post('/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters')
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { email, password } = req.body;

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({
          errors: [{ message: 'Email in use' }]
        });
      }

      const user = await User.create({
        email,
        password,
        role: 'user',
        status: 'active'
      });

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: user.role
        },
        config.jwtKey,
        { expiresIn: '24h' }
      );

      res.status(201).json({
        token,
        user: {
          id: user.id,
          email: user.email,
          role: user.role
        }
      });
    } catch (err) {
      console.error('Sign up error:', err);
      res.status(500).json({
        errors: [{ message: 'Error creating user' }]
      });
    }
  }
);

router.post('/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().notEmpty().withMessage('Password is required')
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({
          errors: [{ message: 'Invalid credentials' }]
        });
      }

      const isValidPassword = await user.comparePassword(password);
      if (!isValidPassword) {
        return res.status(400).json({
          errors: [{ message: 'Invalid credentials' }]
        });
      }

      // 生成 JWT
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: user.role
        },
        config.jwtKey,
        { expiresIn: '24h' }
      );

      // 更新最后登录时间
      user.lastLogin = new Date();
      await user.save();

      res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          role: user.role
        }
      });
    } catch (err) {
      console.error('Sign in error:', err);
      res.status(500).json({
        errors: [{ message: 'Error signing in' }]
      });
    }
  }
);

module.exports = router; 