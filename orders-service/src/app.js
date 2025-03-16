const express = require('express');
const cors = require('cors');
const { errorHandler } = require('./middlewares/error-handler');
const ordersRouter = require('./routes/orders');
const paymentsRouter = require('./routes/payments');
const adminRouter = require('./routes/admin');

const app = express();

// CORS 配置
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3001',
  credentials: true
}));

// 为 Stripe webhook 路由使用 raw body
app.use('/api/payments/webhook', express.raw({ type: 'application/json' }));
// 为其他路由使用 JSON body parser
app.use(express.json());

// 健康检查路由
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// API 路由
app.use('/api/orders', ordersRouter);
app.use('/api/payments', paymentsRouter);
app.use('/api/admin', adminRouter);

// 错误处理中间件
app.use(errorHandler);

module.exports = app; 