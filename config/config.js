require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USER || "default_user",
    password: process.env.DB_PASS || "default_password",
    database: process.env.DB_NAME || "inventorydb",
    host: process.env.DB_HOST || "127.0.0.1",
    port: process.env.DB_PORT || 5432,
    dialect: "postgres",
  },
  test: {
    username: process.env.DB_USER || "default_user",
    password: process.env.DB_PASS || "default_password",
    database: process.env.DB_NAME_TEST || "inventorydb",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "postgres",
  },
  production: {
    username: process.env.DB_USER || "default_user",
    password: process.env.DB_PASS || "default_password",
    database: process.env.DB_NAME_PROD || "inventorydb",
    host: process.env.DB_HOST || "127.0.0.1",
    port: process.env.DB_PORT || 5432,
    dialect: "postgres",
    logging: false,
  },
};

console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASS:", process.env.DB_PASS);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_PORT:", process.env.DB_PORT);
