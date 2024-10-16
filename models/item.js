'use strict';
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true, // Puede ser nulo
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: true, // Puede ser nulo si no está asignado a una categoría
      references: {
        model: 'Category',
        key: 'id',
      },
    },
  }, {
    tableName: 'items',
    timestamps: true, // Para asegurar que Sequelize maneje `createdAt` y `updatedAt`
  });

  // Definir la relación con Category
  Item.associate = function(models) {
    Item.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      as: 'category',
    });
  };

  return Item;
};
