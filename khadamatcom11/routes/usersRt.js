const express = require("express");
const router = express.Router();
const db = require("../db-config");

//Data fetching for logged-in users in
router.get("/loggedin_user", (req, res) => {
    if (req.isAuthenticated()) {
        res.json({
            id: req.user.id,
            authenticated: true,
            name: req.user.firstname + " " + req.user.lastname,
            email: req.user.email,
            role: req.user.role,
            nationalid: req.user.nationalid,
            governorate: req.user.governorate,
            phone: req.user.phone,
            birthdate: req.user.birthdate,
            gender: req.user.gender,
            createdat: req.user.createdat,
            picture: req.user.picture || null
        });
    } else {
        res.status(401).json({ authenticated: false });
    }
});

//Data fetching for users
router.get("/", (req, res) => {
    db.query("SELECT * FROM users", (err, results) => {
        if (err) {
            console.error("Error querying the database:", err.stack);
            res.json(500,"Somthing went wrong. Try again later!")
        }
        if (results.rows && results.rows.length > 0) {
            res.status(200).json(results.rows);}
    });
});

//Data fetching for users in react app
router.get("/:id", (req, res) => {
    const {id} = req.params;
    db.query("SELECT * FROM users WHERE id = $1", [id], (err, results) => {
        if (err) {
            console.error("Error querying the database:", err.stack);
        }
        if (results.rows && results.rows.length > 0) {
            res.status(200).json({
                id: results.rows[0].id,
                name: results.rows[0].firstname + " " + results.rows[0].lastname,
                nationalid: results.rows[0].nationalid,
                email: results.rows[0].email,
                role: results.rows[0].role,
                governorate: results.rows[0].governorate,
                phone: results.rows[0].phone,
                birthdate: results.rows[0].birthdate,
                gender: results.rows[0].gender,
                createdat: results.rows[0].createdat,
                picture: results.rows[0].picture || null
                });
        } else {
            res.json({ message: `There is no worker with id : ${id} `});
        }
    });
});



module.exports = router;