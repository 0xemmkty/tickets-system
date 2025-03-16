const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '123456',
  database: process.env.DB_NAME || 'orders',
  logging: false
});

// 初始化模型
const Order = require('./order')(sequelize);

const models = {
  Order
};

module.exports = {
  sequelize,
  ...models
}; 