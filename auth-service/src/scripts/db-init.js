require('dotenv').config();
const { Pool } = require('pg');

// 添加这些日志来检查环境变量是否正确读取
console.log('Current directory:', process.cwd());
console.log('Environment variables:', {
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME
});

const config = {
  user: 'postgres',
  password: '123456',
  host: 'localhost',
  port: 5432,
  database: 'auth',
  // 添加这些选项
  ssl: false,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
};

console.log('Trying to connect with config:', {
  ...config,
  password: '***' // 隐藏密码
});

const pool = new Pool(config);

pool.connect()
  .then(client => {
    console.log('Database connected successfully');
    client.release();
  })
  .catch(err => {
    console.error('Database connection error:', err.message);
    process.exit(1);
  }); 