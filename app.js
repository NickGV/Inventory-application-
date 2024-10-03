const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("welcome to the inventory management system");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
