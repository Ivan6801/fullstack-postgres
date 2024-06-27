const { Client } = require('pg');

async function getConnection() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'ivan',
    password: 'admin123',
    database: 'wms',
  });
  await client.connect();
  return client;
}

module.exports = getConnection;
