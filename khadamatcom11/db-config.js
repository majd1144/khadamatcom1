const { Client } = require('pg');
require('dotenv').config();

const db = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    require: true,
    rejectUnauthorized: false,
  },
});

db.connect()
  .then(() => console.log("✅ Connected to Neon PostgreSQL DB"))
  .catch((err) => console.error("❌ Connection error:", err));

module.exports = db;
