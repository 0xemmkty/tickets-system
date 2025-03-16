const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '123456',
  database: process.env.DB_NAME || 'tickets',
  logging: false
});

// 初始化模型
const Ticket = require('./ticket')(sequelize);

const models = {
  Ticket
};

// 设置模型关联关系（如果需要的话）
// Object.values(models).forEach(model => {
//   if (model.associate) {
//     model.associate(models);
//   }
// });

module.exports = {
  sequelize,
  ...models
}; 