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
    const server = app.listen(config.port, () => {
      console.log(`Orders service listening on port ${config.port}`);
    });

    // 处理服务器错误
    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.log(`Port ${config.port} is already in use. Trying port ${config.port + 1}`);
        server.close();
        // 尝试使用下一个端口
        app.listen(config.port + 1, () => {
          console.log(`Orders service listening on port ${config.port + 1}`);
        });
      } else {
        console.error('Server error:', err);
        process.exit(1);
      }
    });

    // 优雅关闭
    process.on('SIGTERM', () => {
      console.log('SIGTERM signal received: closing HTTP server');
      server.close(() => {
        console.log('HTTP server closed');
        sequelize.close().then(() => {
          console.log('Database connection closed');
          process.exit(0);
        });
      });
    });

  } catch (err) {
    console.error('Unable to start the server:', err);
    process.exit(1);
  }
};

start(); 