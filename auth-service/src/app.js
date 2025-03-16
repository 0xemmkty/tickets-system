const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { errorHandler } = require('./middlewares/error-handler');

const app = express();

// 添加 CORS 中间件
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// 健康检查路由
app.get('/api/auth/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// 认证路由
app.use('/api/auth', require('./routes/auth'));

// 错误处理中间件
app.use(errorHandler);

module.exports = app; 