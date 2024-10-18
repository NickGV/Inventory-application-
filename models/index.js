const { Sequelize } = require('sequelize');
const config = require('../config/config');

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    port: config.development.port,
    dialect: config.development.dialect
  }
);

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Category = require('./category')(sequelize, Sequelize.DataTypes);
db.Item = require('./item')(sequelize, Sequelize.DataTypes);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
