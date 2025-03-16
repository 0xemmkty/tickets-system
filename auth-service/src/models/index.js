const { Sequelize } = require('sequelize');
const config = require('../config');

// 使用与 .env 文件相同的配置
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '123456',
  database: process.env.DB_NAME || 'auth',
  logging: false
});

// 初始化模型
const User = require('./user')(sequelize);

const models = {
  User
};

// 测试连接
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

module.exports = {
  sequelize,
  ...models,
  testConnection
}; 