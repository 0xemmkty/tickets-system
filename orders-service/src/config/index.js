module.exports = {
  port: process.env.PORT || 3003,
  database: {
    url: process.env.DATABASE_URL || 'postgres://postgres:postgres123@localhost:5432/orders',
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
    secret: 'shared_jwt_secret_key_123'
  },
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET
  },
  services: {
    tickets: process.env.TICKETS_SERVICE_URL || 'http://localhost:3002',
    auth: process.env.AUTH_SERVICE_URL || 'http://localhost:3000'
  }
}; 