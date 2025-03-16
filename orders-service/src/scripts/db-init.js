const { Client } = require('pg');

const createDatabase = async () => {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '123456',
    database: 'postgres' // 连接到默认数据库
  });

  try {
    await client.connect();
    
    // 检查数据库是否存在
    const res = await client.query(
      "SELECT 1 FROM pg_database WHERE datname = 'orders'"
    );

    // 如果数据库不存在，创建它
    if (res.rowCount === 0) {
      await client.query('CREATE DATABASE orders');
      console.log('Database created successfully');
    } else {
      console.log('Database already exists');
    }
  } catch (err) {
    console.error('Error creating database:', err);
  } finally {
    await client.end();
  }
};

createDatabase(); 