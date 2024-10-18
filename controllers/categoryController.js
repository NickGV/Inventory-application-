const Category = require("../models/category");

// Mostrar todas las categorías
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll(); // Obtenemos todas las categorías
    res.render("categories", { categories }); // Renderizamos la vista 'categories.ejs'
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al obtener las categorías");
  }
};

// Mostrar una categoría específica y sus items
exports.getCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: "items", // Asegúrate de que esto funciona según tus asociaciones
    });
    if (!category) {
      return res.status(404).send("Categoría no encontrada");
    }
    res.render("category", { category }); // Renderizamos la vista 'category.ejs'
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al obtener la categoría");
  }
};

// Crear una nueva categoría
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = await Category.create({ name });
    res.redirect("/categories"); // Redirigimos a la vista de categorías
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al crear la categoría");
  }
};

// Editar una categoría existente
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

// Eliminar una categoría
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
