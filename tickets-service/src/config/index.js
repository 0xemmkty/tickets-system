module.exports = {
  port: process.env.PORT || 3002,
  database: {
    url: process.env.DATABASE_URL || 'postgres://postgres:postgres123@localhost:5432/tickets',
    options: {
      dialect: 'postgres',
      logging: false,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    }
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key'
  }
}; 