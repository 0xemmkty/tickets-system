const express = require('express');
const { requireAuth } = require('../middlewares/require-auth');
const { requireAdmin } = require('../middlewares/require-admin');
const { Order } = require('../models');

const router = express.Router();

// 获取所有订单
router.get('/orders',
  requireAuth,
  requireAdmin,
  async (req, res) => {
    try {
      const orders = await Order.findAll({
        order: [['createdAt', 'DESC']]
      });
      res.json(orders);
    } catch (err) {
      res.status(400).json({
        errors: [{ message: 'Error fetching orders' }]
      });
    }
  }
);

// 处理退款
router.post('/orders/:id/refund',
  requireAuth,
  requireAdmin,
  async (req, res) => {
    try {
      const order = await Order.findByPk(req.params.id);
      if (!order) {
        return res.status(404).json({
          errors: [{ message: 'Order not found' }]
        });
      }

      order.status = 'refunded';
      order.refundReason = req.body.reason;
      await order.save();

      res.json(order);
    } catch (err) {
      res.status(400).json({
        errors: [{ message: 'Error processing refund' }]
      });
    }
  }
);

// 取消订单
router.post('/orders/:id/cancel',
  requireAuth,
  requireAdmin,
  async (req, res) => {
    try {
      const order = await Order.findByPk(req.params.id);
      if (!order) {
        return res.status(404).json({
          errors: [{ message: 'Order not found' }]
        });
      }

      order.status = 'cancelled';
      order.refundReason = req.body.reason;
      await order.save();

      res.json(order);
    } catch (err) {
      res.status(400).json({
        errors: [{ message: 'Error cancelling order' }]
      });
    }
  }
);

module.exports = router; 