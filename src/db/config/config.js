require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER ?? 'postgres',
    password: process.env.DB_PASSWORD ?? null,
    database: process.env.DB_NAME ?? 'scello ecommerce',
    host: process.env.DB_HOST ?? '127.0.0.1',
    dialect: 'postgres',
  },
  test: {
    username: process.env.DB_USER ?? 'postgres',
    password: process.env.DB_PASSWORD ?? null,
    database: process.env.TEST_DB_NAME ?? 'scello ecommerce',
    host: process.env.DB_HOST ?? '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    username: process.env.DB_USER ?? 'postgres',
    password: process.env.DB_PASSWORD ?? null,
    database: process.env.PROD_DB_NAME ?? 'scello ecommerce',
    host: process.env.DB_HOST ?? '127.0.0.1',
    dialect: 'postgres',
  }
};