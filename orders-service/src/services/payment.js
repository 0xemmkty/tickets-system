const stripe = require('stripe')(require('../config').stripe.secretKey);
const { Order } = require('../models');

class PaymentService {
  async createPaymentIntent(amount) {
    return stripe.paymentIntents.create({
      amount: amount * 100, // Stripe uses cents
      currency: 'usd',
      payment_method_types: ['card']
    });
  }

  async confirmPayment(paymentIntentId) {
    return stripe.paymentIntents.confirm(paymentIntentId);
  }

  async handleWebhook(event) {
    switch (event.type) {
      case 'payment_intent.succeeded':
        await this.handlePaymentSuccess(event.data.object);
        break;
      case 'payment_intent.payment_failed':
        await this.handlePaymentFailure(event.data.object);
        break;
    }
  }

  async handlePaymentSuccess(paymentIntent) {
    const order = await Order.findOne({
      where: { id: paymentIntent.metadata.orderId }
    });
    
    if (order) {
      order.status = 'paid';
      await order.save();
      // 这里可以触发订单成功的事件
    }
  }

  async handlePaymentFailure(paymentIntent) {
    const order = await Order.findOne({
      where: { id: paymentIntent.metadata.orderId }
    });
    
    if (order) {
      order.status = 'payment_failed';
      await order.save();
      // 这里可以触发订单失败的事件
    }
  }
}

module.exports = new PaymentService(); 