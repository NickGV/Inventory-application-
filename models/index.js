const { Sequelize } = require('sequelize');
const config = require('../config/config'); // Importa la configuración
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

const Category = require('./category');
const Item = require('./item');

Item.belongsTo(Category, { foreignKey: 'CategoryId' });
Category.hasMany(Item, { foreignKey: 'CategoryId' });

module.exports = {
  sequelize,
  Category,
  Item
};
