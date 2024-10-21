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

exports.newCategory = async (req, res) => {
  res.render("newCategory");
};

exports.createCategory = async (req, res) => {
  console.log('Received request to create category:', req.body);
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Category name is required" });
    }

    console.log('Attempting to create category with name:', name);
    const newCategory = await Category.create({ name });
    console.log('New category created:', newCategory.toJSON());

    res.status(201).json(newCategory);
  } catch (error) {
    console.error('Detailed error creating category:', error);
    res.status(500).json({ error: "Error creating category", details: error.message });
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
    res.render("category/show", { category });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al obtener la categoría");
  }
};

exports.editCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).send("Categoría no encontrada");
    }
    res.render("category/edit", { category });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al obtener la categoría");
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
