const express = require('express');
const router = express.Router();
const { Category, Item } = require('../models');


// GET all items in a category
router.get('/:categoryId', async (req, res) => {
  const categoryId = req.params.categoryId;
  try {
    const items = await Item.findAll({ where: { CategoryId: categoryId } });
    res.render('items/index', { items });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create item
router.post('/', async(req, res) => {
  const item = req.body;
  try{
    const newItem = await Item.create(item);
    res.redirect(`/categories/${item.CategoryId}`);
  }catch(error){
    res.status(400).json({error: error.message});
  }
})

module.exports = router;