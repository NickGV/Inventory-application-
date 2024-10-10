const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController'); // Asegúrate que el nombre y la ruta sean correctos

// Ruta para obtener todas las categorías
router.get('/categories', categoryController.getCategories);

// Ruta para obtener una categoría específica
router.get('/categories/:id', categoryController.getCategory);

// Ruta para crear una nueva categoría
router.post('/categories', categoryController.createCategory);

// Ruta para actualizar una categoría
router.put('/categories/:id', categoryController.updateCategory);

// Ruta para eliminar una categoría
router.delete('/categories/:id', categoryController.deleteCategory);

module.exports = router;
