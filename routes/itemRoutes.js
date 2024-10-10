const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

// Rutas para ítems
router.get('/', itemController.getItems);
router.get('/:id', itemController.getItemById);
router.get('/category/:categoryId', itemController.getItemsByCategory);
router.post('/', itemController.createItem);
router.put('/:id', itemController.updateItem);
router.delete('/:id', itemController.deleteItem);

module.exports = router;
