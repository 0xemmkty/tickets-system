const app = require('./app');
const { sequelize } = require('./models');
const { seedTickets } = require('./data/seed');
const config = require('./config');

const start = async () => {
  try {
    // 连接数据库
    await sequelize.authenticate();
    console.log('Connected to PostgreSQL');

    // 同步数据库模型
    await sequelize.sync({ force: true }); // 在开发环境使用 force: true
    console.log('Database synced');

    // 添加示例数据
    await seedTickets();
    console.log('Sample tickets added');

    // 启动服务器
    const server = app.listen(config.port, () => {
      console.log(`Tickets service listening on port ${config.port}`);
    });

    // 处理服务器错误
    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`Port ${config.port} is already in use`);
        process.exit(1);
      } else {
        console.error('Server error:', err);
        process.exit(1);
      }
    });

  } catch (err) {
    console.error('Unable to start the server:', err);
    process.exit(1);
  }
};

start(); 