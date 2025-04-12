const express = require("express");
const router = express.Router();
const db = require("../db-config");

router.post('/reviews', (req, res) => {
    const { userid, workerid, rating, comment } = req.body;
    if (rating) {
        const checkQuery = 'SELECT * FROM reviews WHERE userid = $1 AND workerid = $2 AND rating IS NOT NULL';
        db.query(checkQuery, [userid, workerid], (err, result) => {
            if (err) return res.status(500).json({ error: 'Error checking existing review' });
            
            if (result.rows.length > 0) {
            return res.status(400).json({ message: 'You already rated this worker' });}
        
            else {insertReview();}
        });
    } else {
        insertReview();
    }

    function insertReview() {
        const insertQuery = 'INSERT INTO reviews (userid, workerid, rating, comment) VALUES ($1, $2, $3, $4)';
        db.query(insertQuery, [userid, workerid, rating || null, comment || null], (err, result) => {
            if (err) return res.status(500).json({ error: 'Error adding review' });
            res.status(200).json({ message: 'Review added' });
        });
    }
});

router.get('/review/:workerid/average', (req, res) => {
    const { workerid } = req.params;

    const query = `SELECT AVG(rating)::numeric(2,1) AS average_rating
    FROM reviews WHERE workerid = $1 AND rating IS NOT NULL`;

    db.query(query, [workerid], (err, result) => {
        if (err) return res.status(500).json({ error: 'Error fetching average' });
        res.json({ average_rating: result.rows[0].average_rating });
    });
});

module.exports = router;