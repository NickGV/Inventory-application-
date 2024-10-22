require("dotenv").config();
const { Category, Item } = require("../../models");
const sequelize = require("../../models").sequelize;

async function seedDatabase() {
  try {
    await sequelize.sync({ force: true });
    const categories = await Category.bulkCreate([
      { name: "Electronics" },
      { name: "Books" },
      { name: "Clothing" },
    ]);
    await Item.bulkCreate([
      {
        name: "Laptop",
        categoryId: categories[0].id,
        description: "High-end laptop",
        price: 1200.5,
      },
      {
        name: "Smartphone",
        categoryId: categories[0].id,
        description: "Latest model smartphone",
        price: 800.0,
      },
      {
        name: "Fiction Book",
        categoryId: categories[1].id,
        description: "Bestselling novel",
        price: 15.99,
      },
      {
        name: "T-shirt",
        categoryId: categories[2].id,
        description: "Cotton t-shirt",
        price: 9.99,
      },
    ]);

    console.log("Base de datos poblada correctamente");
  } catch (error) {
    console.error("Error poblando la base de datos:", error);
  } finally {
    process.exit();
  }
}

seedDatabase();
