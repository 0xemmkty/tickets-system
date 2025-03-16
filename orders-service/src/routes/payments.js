const express = require('express');
const stripe = require('stripe')(require('../config').stripe.secretKey);
const { requireAuth } = require('../middlewares/require-auth');
const { createPaymentIntent, confirmPayment } = require('../services/payment');
const config = require('../config');
const { Order } = require('../models');

const router = express.Router();

// 创建支付意向
router.post('/create-payment-intent',
  requireAuth,
  async (req, res) => {
    try {
      const { orderId } = req.body;

      const order = await Order.findOne({
        where: {
          id: orderId,
          userId: req.currentUser.id
        }
      });

      if (!order) {
        return res.status(404).json({
          errors: [{ message: 'Order not found' }]
        });
      }

      const paymentIntent = await createPaymentIntent(order.amount);
      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (err) {
      res.status(400).json({
        errors: [{ message: 'Error creating payment intent' }]
      });
    }
  }
);

// Stripe webhook
router.post('/webhook',
  express.raw({ type: 'application/json' }),
  async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object;
      // 更新订单状态
      // TODO: 实现订单状态更新逻辑
    }

    res.json({ received: true });
  }
);

module.exports = router; 