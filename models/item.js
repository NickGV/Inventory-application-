module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.DECIMAL(10, 2)
  });

  Item.associate = function(models) {
    Item.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' });
  };

  return Item;
};