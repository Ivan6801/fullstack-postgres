const { Sequelize } = require('sequelize');
const { config } = require('./../config/config.js');
const setupModels = require('./../db/models');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_HOST = config.dbHost;
const DB_PORT = config.dbPort;
const DB_NAME = config.dbName;

const sequelize = new Sequelize(DB_NAME, USER, PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'postgres',
  logging: true,
});

setupModels(sequelize);

module.exports = sequelize;
