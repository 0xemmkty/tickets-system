const { sequelize } = require('../models');

beforeAll(async () => {
  // 连接测试数据库
  process.env.DB_NAME = 'ticket_auth_test';
  await sequelize.sync({ force: true });
});

beforeEach(async () => {
  // 清空所有表
  await sequelize.truncate({ cascade: true });
});

afterAll(async () => {
  // 关闭数据库连接
  await sequelize.close();
}); 