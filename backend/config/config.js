require('dotenv').config();

const config = {
  port: process.env.PORT || 3001,
  dbUser: process.env.DB_USER || 'ivan',
  dbPassword: process.env.DB_PASSWORD || 'admin123',
  dbHost: process.env.DB_HOST || 'localhost',
  dbName: process.env.DB_NAME || 'wms',
  dbPort: process.env.DB_PORT || 5432,
};

module.exports = { config };
