const Item = require('../models/item'); // Asegúrate de que estás importando el modelo de item

// Obtener todos los items
exports.getItems = async (req, res) => {
  try {
    const items = await Item.findAll();
    res.render('items/index', { items });
  } catch (error) {
    res.status(500).send({ message: 'Error al obtener los items', error });
  }
};

// Obtener un item por ID
exports.getItem = async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (!item) {
      return res.status(404).send({ message: 'Item no encontrado' });
    }
    res.render('items/show', { item });
  } catch (error) {
    res.status(500).send({ message: 'Error al obtener el item', error });
  }
};

// Crear un nuevo item
exports.createItem = async (req, res) => {
  try {
    const { name, categoryId, description, price } = req.body;
    const newItem = await Item.create({ name, categoryId, description, price });
    res.redirect(`/items/${newItem.id}`);
  } catch (error) {
    res.status(500).send({ message: 'Error al crear el item', error });
  }
};

// Actualizar un item por ID
exports.updateItem = async (req, res) => {
  try {
    const { name, categoryId, description, price } = req.body;
    const item = await Item.findByPk(req.params.id);
    if (!item) {
      return res.status(404).send({ message: 'Item no encontrado' });
    }
    await item.update({ name, categoryId, description, price });
    res.redirect(`/items/${item.id}`);
  } catch (error) {
    res.status(500).send({ message: 'Error al actualizar el item', error });
  }
};

// Eliminar un item por ID
exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (!item) {
      return res.status(404).send({ message: 'Item no encontrado' });
    }
    await item.destroy();
    res.redirect('/items');
  } catch (error) {
    res.status(500).send({ message: 'Error al eliminar el item', error });
  }
};
