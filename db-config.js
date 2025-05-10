const { Client } = require('pg');
require('dotenv').config();

const db = new Client({
    user: process.env.USER,
    host: process.env.HOSTING, 
    database: process.env.DB,
    password: process.env.PASSWORD,
    port: process.env.DB_PORT, 
    ssl: {
        rejectUnauthorized: false // Required if using self-signed SSL certificates
    }
});

module.exports = db;