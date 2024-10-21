const express = require("express");
const app = express();
const path = require("path");
const categoryRoutes = require("./routes/categoryRoutes");
const itemRoutes = require("./routes/itemRoutes");
const methodOverride = require("method-override");
const db = require("./models");

const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", categoryRoutes);

app.get("/", async (req, res) => {
  try {
    const items = await db.Item.findAll();
    const categories = await db.Category.findAll();
    res.render("home", { categories, items });
  } catch (error) {
    res.status(500).send("Error loading home page");
  }
});
app.use("/", categoryRoutes);
app.use("/", itemRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Agrega esto después de definir todas tus rutas
app._router.stack.forEach(function (r) {
  if (r.route && r.route.path) {
    console.log(r.route.method, r.route.path);
  }
});
