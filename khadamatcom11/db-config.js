const { Client } = require('pg');
require('dotenv').config();

const getConnection = () => {
    return new Client({
        connectionString: process.env.DATABASE_URL,  // Use connectionString with the URL
        ssl: {
          rejectUnauthorized: false // Necessary for some cloud providers (e.g., Heroku)
        }
    });
};


module.exports = getConnection;