const express = require('express');
const { body } = require('express-validator');
const { validateRequest } = require('../middlewares/validate-request');
const { requireAuth } = require('../middlewares/require-auth');
const { Order } = require('../models');

const router = express.Router();

// 创建订单
router.post('/',
  requireAuth,
  [
    body('ticketId').isInt().withMessage('Ticket ID must be provided'),
    body('seats').isArray().withMessage('Seats must be an array'),
    body('amount').isFloat({ gt: 0 }).withMessage('Amount must be greater than 0')
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { ticketId, seats, amount } = req.body;
      
      const order = await Order.create({
        ticketId,
        userId: req.currentUser.id,
        seats,
        amount,
        status: 'pending',
        orderNumber: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      });

      res.status(201).json(order);
    } catch (err) {
      console.error('Error creating order:', err);
      res.status(400).json({
        errors: [{ message: 'Error creating order' }]
      });
    }
  }
);

// 获取用户的所有订单
router.get('/my-orders',
  requireAuth,
  async (req, res) => {
    try {
      console.log('Getting orders for user:', req.currentUser);
      
      const orders = await Order.findAll({
        where: { userId: req.currentUser.id },
        order: [['createdAt', 'DESC']]
      });
      
      console.log('Found orders:', orders);
      res.json(orders);
    } catch (err) {
      console.error('Error fetching orders:', err);
      res.status(400).json({
        errors: [{ 
          message: 'Error fetching orders',
          details: err.message 
        }]
      });
    }
  }
);

// 获取单个订单详情
router.get('/:id',
  requireAuth,
  async (req, res) => {
    try {
      const order = await Order.findOne({
        where: {
          id: req.params.id,
          userId: req.currentUser.id
        }
      });

      if (!order) {
        return res.status(404).json({
          errors: [{ message: 'Order not found' }]
        });
      }

      res.json(order);
    } catch (err) {
      res.status(400).json({
        errors: [{ message: 'Error fetching order' }]
      });
    }
  }
);

// 获取订单状态
router.get('/:id/status',
  requireAuth,
  async (req, res) => {
    try {
      const order = await Order.findOne({
        where: {
          id: req.params.id,
          userId: req.currentUser.id
        },
        attributes: ['status']
      });

      if (!order) {
        return res.status(404).json({
          errors: [{ message: 'Order not found' }]
        });
      }

      res.json({ status: order.status });
    } catch (err) {
      res.status(400).json({
        errors: [{ message: 'Error fetching order status' }]
      });
    }
  }
);

// 取消订单
router.post('/:id/cancel',
  requireAuth,
  [
    body('reason').trim().notEmpty().withMessage('Reason is required')
  ],
  validateRequest,
  async (req, res) => {
    const order = await Order.findOne({
      where: {
        id: req.params.id,
        userId: req.currentUser.id,
        status: 'paid'
      }
    });

    if (!order) {
      return res.status(404).json({
        errors: [{ message: 'Order not found or cannot be cancelled' }]
      });
    }

    order.status = 'cancelled';
    order.refundReason = req.body.reason;
    await order.save();

    res.json(order);
  }
);

// 申请退款
router.post('/:id/refund',
  requireAuth,
  [
    body('reason').trim().notEmpty().withMessage('Reason is required')
  ],
  validateRequest,
  async (req, res) => {
    const order = await Order.findOne({
      where: {
        id: req.params.id,
        userId: req.currentUser.id,
        status: 'paid'
      }
    });

    if (!order) {
      return res.status(404).json({
        errors: [{ message: 'Order not found or cannot be refunded' }]
      });
    }

    order.status = 'refunded';
    order.refundReason = req.body.reason;
    await order.save();

    res.json(order);
  }
);

module.exports = router; 