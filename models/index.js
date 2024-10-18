const { Sequelize } = require('sequelize');
const config = require('../config/config'); // Importa la configuración

// Aquí estás inicializando sequelize con la configuración correcta
const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    port: config.development.port,
    dialect: config.development.dialect // Asegúrate de que el dialecto esté presente aquí
  }
);

const Category = require('./category');
const Item = require('./item');

// Establece las asociaciones
Item.belongsTo(Category, { foreignKey: 'CategoryId' });
Category.hasMany(Item, { foreignKey: 'CategoryId' });

module.exports = {
  sequelize,
  Category,
  Item
};
