const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'ivan',
  password: 'admin123',
  database: 'wms',
});

module.exports = pool;
