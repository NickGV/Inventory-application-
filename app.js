const express = require("express");
const app = express();
const path = require('path');
const categoryroutes = require("./routes/categoryRoutes");
const itemsroutes = require("./routes/itemRoutes");

const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("welcome to the inventory management system");
});

app.use(categoryroutes);
app.use(itemsroutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});