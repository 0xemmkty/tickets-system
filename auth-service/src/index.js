const app = require('./app');
const { sequelize } = require('./models');
const config = require('./config');

const start = async () => {
  try {
    // 连接数据库
    await sequelize.authenticate();
    console.log('Connected to PostgreSQL');

    // 同步数据库模型
    await sequelize.sync({ force: true }); // 在开发环境使用 force: true
    console.log('Database synced');

    // 启动服务器
    app.listen(config.port, () => {
      console.log(`Auth service listening on port ${config.port}`);
    });
  } catch (err) {
    console.error('Unable to start the server:', err);
    process.exit(1);  // 如果出错，退出进程
  }
};

start(); 