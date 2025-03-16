const express = require('express');
const cors = require('cors');
const { errorHandler } = require('./middlewares/error-handler');
const ticketsRouter = require('./routes/tickets');

const app = express();

// 更新 CORS 配置
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3001', // 前端端口保持 3001
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// 健康检查路由
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// 票务路由
app.use('/api/tickets', ticketsRouter);

// 错误处理中间件
app.use(errorHandler);

module.exports = app; 