const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

router.get("/categories", categoryController.getCategories);
router.get("/categories/new", categoryController.newCategory);
router.get("/api/categories", categoryController.createCategory);
router.get("/categories/:id", categoryController.getCategory);
router.get("/categories/:id/edit", categoryController.editCategory);
router.put("/categories/:id", categoryController.updateCategory);
router.delete("/categories/:id", categoryController.deleteCategory);
router.post("/api/categories", categoryController.createCategory);

module.exports = router;
