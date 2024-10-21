const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");

router.get("/api/items", itemController.getItems);
router.get("/items/new", itemController.createItemForm);
router.post("/items", itemController.createItem);
router.get("/items/:id", itemController.getItem);
router.get("/items/:id/edit", itemController.updateItemForm);
router.put("/items/:id", itemController.updateItem);
router.delete("/items/:id", itemController.deleteItem);

module.exports = router;