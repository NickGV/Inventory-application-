const Item = require('../models/item'); // Asegúrate de que estás importando el modelo de item
const Category = require('../models/category'); // Asegúrate de importar el modelo de Category

// Obtener todos los items
exports.getItems = async (req, res) => {
  try {
    const items = await Item.findAll({ include: Category });
    res.render('items/index', { items });
  } catch (error) {
    res.status(500).send({ message: 'Error al obtener los items', error });
  }
};

// Obtener un item por ID
exports.getItem = async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id, { include: Category });
    if (!item) {
      return res.status(404).send({ message: 'Item no encontrado' });
    }
    res.render('items/show', { item });
  } catch (error) {
    res.status(500).send({ message: 'Error al obtener el item', error });
  }
};

// Mostrar formulario para crear un nuevo item
exports.newItem = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.render('items/create', { categories });
  } catch (error) {
    res.status(500).send({ message: 'Error al cargar el formulario', error });
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

// Mostrar formulario para editar un item
exports.editItem = async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id);
    const categories = await Category.findAll();
    if (!item) {
      return res.status(404).send({ message: 'Item no encontrado' });
    }
    res.render('items/edit', { item, categories });
  } catch (error) {
    res.status(500).send({ message: 'Error al cargar el formulario de edición', error });
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
