const db = require("../models");
const { Category } = db;

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.render("home", { categories });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al obtener las categorías");
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).send("El nombre de la categoría es requerido");
    }
    const newCategory = await Category.create({ name });
    res.redirect("/home");
  } catch (err) {
    console.error("Error al crear la categoría:", err);
    res.status(500).send(`Error al crear la categoría: ${err.message}`);
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
    res.redirect("/home");
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
    res.redirect("/home");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al eliminar la categoría");
  }
};
