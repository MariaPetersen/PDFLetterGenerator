const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.DB_HOST,
  port: 5432,
  database: "pdfgenerator",
});

module.exports = {
  query: (text: string, params?: any[]) => pool.query(text, params),
};
