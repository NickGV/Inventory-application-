const db = require("../models");
const Item = db.Item;
const Category = db.Category;

exports.getItems = async (req, res) => {
  try {
    const items = await Item.findAll({
      include: [{ model: Category, as: "category" }],
    });
    res.render("items/index", { items });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "Error al obtener los items", error: error.message });
  }
};
exports.getItem = async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id, { include: Category });
    if (!item) {
      return res.status(404).send({ message: "Item no encontrado" });
    }
    res.render("items/show", { item });
  } catch (error) {
    res.status(500).send({ message: "Error al obtener el item", error });
  }
};

exports.createItemForm = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.render("items/create", { categories });
  } catch (error) {
    res.status(500).send({ message: "Error al cargar el formulario", error });
  }
};

exports.createItem = async (req, res) => {
  try {
    const { name, categoryId, description, price } = req.body;
    const newItem = await Item.create({ name, categoryId, description, price });
    res.redirect(`/items/${newItem.id}`);
  } catch (error) {
    res.status(500).send({ message: "Error al crear el item", error });
  }
};

exports.updateItemForm = async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id);
    const categories = await Category.findAll();
    if (!item) {
      return res.status(404).send({ message: "Item no encontrado" });
    }
    res.render("items/edit", { item, categories });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error al cargar el formulario de edición", error });
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
    res.redirect(`/items/${item.id}`);
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
    res.redirect("/items");
  } catch (error) {
    res.status(500).send({ message: "Error al eliminar el item", error });
  }
};
