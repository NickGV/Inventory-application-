const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/categoryController");
// GET all categories
router.get("/", CategoryController.getCategories);

// GET a category by id
router.get("/:id", CategoryController.getCategoryById);

// POST a new category
router.post("/", CategoryController.createCategory);

router.put("/:id", CategoryController.updateCategory);

router.delete("/:id", CategoryController.deleteCategory);

module.exports = router;