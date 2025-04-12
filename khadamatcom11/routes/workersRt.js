const express = require("express");
const router = express.Router();
const db = require("../db-config");

//Data fetching for users in react app
router.get("/", (req, res) => {
    db.query("SELECT * FROM workers JOIN users ON workers.userid = users.id", (err, results) => {
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
    db.query("SELECT * FROM workers JOIN users ON workers.userid = users.id AND workers.id = $1", [id], (err, results) => {
        if (err) {
            console.error("Error querying the database:", err.stack);
        }
        if (results.rows && results.rows.length > 0) {
            res.status(200).json({
                id: results.rows[0].id,
                userid: results.rows[0].userid,
                name: results.rows[0].firstname + " " + results.rows[0].lastname,
                servicecategory: results.rows[0].servicecategory,
                bio: results.rows[0].bio,
                experience: results.rows[0].experience,
                createdat: results.rows[0].createdat,
                fee: results.rows[0].fee,
                rating: (results.rows[0].rating || null),
                nationalid: results.rows[0].nationalid,
                email: results.rows[0].email,
                role: results.rows[0].role,
                governorate: results.rows[0].governorate,
                phone: results.rows[0].phone,
                birthdate: results.rows[0].birthdate,
                gender: results.rows[0].gender,
                picture: results.rows[0].picture || null
            });
        } else {
            res.json({ message: `There is no worker with id : ${id} `});
        }
    });
});

module.exports = router;