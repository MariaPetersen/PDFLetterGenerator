const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: 5432,
  database: process.env.DATABASE,
});

module.exports = {
  query: (text: string, params?: any[]) => pool.query(text, params),
};
