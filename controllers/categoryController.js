const { Category } = require("../models");

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json({ categories });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCategoryById = async (req, res) => {
  const id = req.params.id;
  try {
    const category = await Category.findByPk(id);
    res.status(200).json({ category });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.createCategory = async (req, res) => {
  const category = req.body;
  try {
    const newCategory = await Category.create(category);
    res.redirect("/categories");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    await category.update(req.body);
    res.status(200).json({ category });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    await category.destroy();
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
