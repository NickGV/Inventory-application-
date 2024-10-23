require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USER || "default_user",
    password: process.env.DB_PASS || "default_password",
    database: process.env.DB_NAME || "inventory_db_dev",
    host: process.env.DB_HOST || "127.0.0.1",
    port: process.env.DB_PORT || 5432,
    dialect: "postgres",
  },
  test: {
    username: process.env.DB_USER || "default_user",
    password: process.env.DB_PASS || "default_password",
    database: process.env.DB_NAME_TEST || "inventory_db_test",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "postgres",
  },
  production: {
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    port: process.env.PGPORT || 5432,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, 
      },
    },
  },
};
