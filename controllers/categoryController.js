const db = require("../models");
const { Category } = db;

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.render("categories", { categories });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al obtener las categorías");
  }
};

exports.getCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: "items",
    });
    if (!category) {
      return res.status(404).send("Categoría no encontrada");
    }
    res.render("category", { category });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al obtener la categoría");
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = await Category.create({ name });
    res.redirect("/categories");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al crear la categoría");
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).send("Categoría no encontrada");
    }
    await category.update({ name });
    res.redirect("/categories");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al actualizar la categoría");
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).send("Categoría no encontrada");
    }
    await category.destroy();
    res.redirect("/categories");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al eliminar la categoría");
  }
};
