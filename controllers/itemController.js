const db = require("../models");
const Item = db.Item;
const Category = db.Category;

exports.getItems = async (req, res) => {
  try {
    const items = await Item.findAll({ include: Category });

    res.json(items);
    res.render('home', { items });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los items", error });
  }
};

exports.getItem = async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id, { include: Category });
    if (!item) {
      return res.status(404).send({ message: "Item no encontrado" });
    }
    res.render("/items/show", { item });
  } catch (error) {
    res.status(500).send({ message: "Error al obtener el item", error });
  }
};

exports.createItem = async (req, res) => {
  try {
    const { name, categoryId, description, price } = req.body;
    const newItem = await Item.create({ name, categoryId, description, price });
    res.redirect("/");
  } catch (error) {
    res.status(500).send({ message: "Error al crear el item", error });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const { name, categoryId, description, price } = req.body;
    const item = await Item.findByPk(req.params.id);
    if (!item) {
      return res.status(404).send({ message: "Item no encontrado" });
    }
    await item.update({ name, categoryId, description, price });
    res.redirect("/");
  } catch (error) {
    res.status(500).send({ message: "Error al actualizar el item", error });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (!item) {
      return res.status(404).send({ message: "Item no encontrado" });
    }
    await item.destroy();
    res.render("/");
  } catch (error) {
    res.status(500).send({ message: "Error al eliminar el item", error });
  }
};
