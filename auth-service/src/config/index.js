const config = {
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres123',
    database: process.env.DB_NAME || 'ticket_auth',
    dialect: 'postgres'
  },
  jwtKey: 'shared_jwt_secret_key_123',
  port: process.env.PORT || 3000
};

module.exports = config; 