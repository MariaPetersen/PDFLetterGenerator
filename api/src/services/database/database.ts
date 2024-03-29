const { Pool } = require("pg");

const pool = new Pool({
  user: "pdfgenerator",
  password: "pdfgenerator",
  host: process.env.DB_HOST,
  port: 5432,
  database: "pdfgenerator",
});

module.exports = {
  query: (text: string, params?: any[]) => pool.query(text, params),
};
