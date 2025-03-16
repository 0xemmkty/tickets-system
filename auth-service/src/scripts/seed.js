require('dotenv').config();
const { Pool } = require('pg');
const { User } = require('../models');

// 使用连接字符串
const connectionString = 'postgresql://postgres:123456@localhost:5432/auth';

const pool = new Pool({ 
  connectionString,
  ssl: false 
});

const seedUsers = async () => {
  try {
    await User.create({
      email: 'test@test.com',
      password: 'password123',
      role: 'admin'
    });
    console.log('Test user created');
  } catch (err) {
    console.error('Error seeding user:', err);
  }
};

// 添加连接测试
pool.connect()
  .then(async (client) => {
    console.log('Database connected successfully');
    try {
      await seedUsers();
    } finally {
      client.release();
      process.exit(0);
    }
  })
  .catch(err => {
    console.error('Connection error:', {
      error: err.message,
      code: err.code
    });
    process.exit(1);
  }); 