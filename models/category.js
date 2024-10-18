'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'categories',
    timestamps: false,
  });

  Category.associate = function(models) {
    Category.hasMany(models.Item, {
      foreignKey: 'categoryId',
      as: 'items',
    });
  };

  return Category;
};
