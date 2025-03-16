const express = require('express');
const { body } = require('express-validator');
const { validateRequest } = require('../middlewares/validate-request');
const { requireAuth } = require('../middlewares/require-auth');
const { Ticket } = require('../models');

const router = express.Router();

// 获取所有票务
router.get('/', async (req, res) => {
  try {
    const tickets = await Ticket.findAll({
      where: { status: 'published' },
      order: [['date', 'ASC']]
    });
    res.json(tickets);
  } catch (err) {
    console.error('Error fetching tickets:', err);
    res.status(400).json({
      errors: [{ message: 'Error fetching tickets' }]
    });
  }
});

// 获取单个票务详情
router.get('/:id', async (req, res) => {
  try {
    const ticket = await Ticket.findOne({
      where: {
        id: req.params.id,
        status: 'published'
      }
    });

    if (!ticket) {
      return res.status(404).json({
        errors: [{ message: 'Ticket not found' }]
      });
    }

    res.json(ticket);
  } catch (err) {
    res.status(400).json({
      errors: [{ message: 'Error fetching ticket' }]
    });
  }
});

// 创建票务（需要管理员权限）
router.post('/',
  requireAuth,
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),
    body('category').trim().notEmpty().withMessage('Category is required'),
    body('venue').trim().notEmpty().withMessage('Venue is required'),
    body('date').isISO8601().withMessage('Valid date is required'),
    body('totalSeats').isInt({ gt: 0 }).withMessage('Total seats must be greater than 0')
  ],
  validateRequest,
  async (req, res) => {
    try {
      const ticket = await Ticket.create({
        ...req.body,
        availableSeats: req.body.totalSeats
      });
      res.status(201).json(ticket);
    } catch (err) {
      res.status(400).json({
        errors: [{ message: 'Error creating ticket' }]
      });
    }
  }
);

// 更新票务状态
router.patch('/:id/status',
  requireAuth,
  [
    body('status').isIn(['published', 'unpublished']).withMessage('Invalid status')
  ],
  validateRequest,
  async (req, res) => {
    try {
      const ticket = await Ticket.findByPk(req.params.id);
      
      if (!ticket) {
        return res.status(404).json({
          errors: [{ message: 'Ticket not found' }]
        });
      }

      ticket.status = req.body.status;
      await ticket.save();
      
      res.json(ticket);
    } catch (err) {
      res.status(400).json({
        errors: [{ message: 'Error updating ticket status' }]
      });
    }
  }
);

module.exports = router; 