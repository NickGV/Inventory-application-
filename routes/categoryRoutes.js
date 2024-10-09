const express = require("express");
const router = express.Router();
const {Category, Item} = require("../models");

// GET all categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.render('categories/index', { categories });
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

// GET a category by id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const category = await Category.findByPk(id);
    res.render('categories/show', { category });
  } catch (error) {
    res.status(404).json({error: error.message});
  }
});

// POST a new category
router.post("/", async (req, res) => {
  const category = req.body;
  try {
    const newCategory = await Category.create(category);
    res.redirect('/categories');
  } catch (error) {
    res.status(400).json({error: error.message});
  }
});

// Get category by id and list items
router.get('/:id', async (req, res) => {
  const category = await Category.findByPk(req.params.id, { include: [Item] });
  res.render('categories/show', { category });
});

module.exports = router;