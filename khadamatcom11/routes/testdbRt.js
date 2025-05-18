const express = require("express");
const router = express.Router();
const db = require('../../db-config');


router.get("/", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
        console.error("Error querying the database:", err.stack);
        return res.render("testdb", { status: "Error querying the database." });
    }

    if (results.rows && results.rows.length > 0) {
        res.render("testdb", { status: "Database connection successful!", results });
    } else {
        res.render("testdb", { status: "No rows returned from the query." });
    }
});
});

module.exports = router; // Export the router
