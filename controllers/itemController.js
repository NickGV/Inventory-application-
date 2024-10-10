const Item = require('../models/item');
const Category = require('../models/category');

// Mostrar todos los items
exports.getItems = async (req, res) => {
  try {
    const items = await Item.findAll();
    res.render('items', { items });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener los items');
  }
};

// Mostrar un item específico
exports.getItem = async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id, {
      include: 'category', // Relacionar con la categoría
    });
    if (!item) {
      return res.status(404).send('Item no encontrado');
    }
    res.render('item', { item });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener el item');
  }
};

// Crear un nuevo item
exports.createItem = async (req, res) => {
  try {
    const { name, price, categoryId } = req.body;
    const newItem = await Item.create({ name, price, categoryId });
    res.redirect('/items');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al crear el item');
  }
};

// Editar un item existente
exports.updateItem = async (req, res) => {
  try {
    const { name, price, categoryId } = req.body;
    const item = await Item.findByPk(req.params.id);
    if (!item) {
      return res.status(404).send('Item no encontrado');
    }
    await item.update({ name, price, categoryId });
    res.redirect('/items');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al actualizar el item');
  }
};

// Eliminar un item
exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (!item) {
      return res.status(404).send('Item no encontrado');
    }
    await item.destroy();
    res.redirect('/items');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al eliminar el item');
  }
};
