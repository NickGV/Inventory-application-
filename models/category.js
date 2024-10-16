const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');  // Asegúrate de que apunte correctamente a la configuración de la base de datos

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'categories',  // Asegúrate de que este nombre coincide con el de tu tabla en la base de datos
  timestamps: false         // Si no tienes columnas de timestamps en tu tabla, asegúrate de deshabilitarlo
});

module.exports = Category;
