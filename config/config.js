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
    database: process.env.DB_NAME_TEST || "inventorydb_test",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "postgres",
  },
  production: {
    use_env_variable: "DATABASE_URL",
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: false,
  },
};