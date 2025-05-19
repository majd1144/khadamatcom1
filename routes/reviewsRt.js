const express = require("express");
const router = express.Router();
const db = require("../../db-config");

router.post('/', (req, res) => {
    const { userid, workerid, comment, rating } = req.body;
    if (rating) {
        const checkQuery = 'SELECT * FROM reviews WHERE userid = $1 AND workerid = $2 AND rating IS NOT NULL';
        db.query(checkQuery, [userid, workerid], (err, result) => {
            if (err) return res.status(500).json({ message: 'Somthing Went Wrong!' }); //Error checking existing review
            if (result.rows.length > 0) {
            return res.status(400).json({ message: 'You already rated this worker' });}
        
            else {insertReview();
                console.log("comment entered successful")
            }
        });
    } else {
        insertReview();
        console.log("comment entered successful")
    }

    function insertReview() {
        const insertQuery = 'INSERT INTO reviews (userid, workerid, rating, comment) VALUES ($1, $2, $3, $4)';
        db.query(insertQuery, [userid, workerid, rating || null, comment || null], (err, result) => {
            if (err) return res.status(500).json({ error: 'Error adding review' });
            res.status(200).json({ message: 'Your review added' });
        });
    }
});


router.get('/:workerid', (req, res) => {
    const { workerid } = req.params;
    const query = `SELECT reviews.*, users.firstname, users.lastname, users.email , users.role, users.picture
                    FROM reviews JOIN users ON reviews.userid = users.id WHERE reviews.workerid = $1`;

    db.query(query, [workerid], (err, result) => {
        if (err) return res.status(500).json({ error: 'Error fetching average' });
        res.json(result.rows);
    });
});
// عددي جميع التقييمات التي تحتوي على rating فقط
router.get('/count/all', (req, res) => {
  const query = 'SELECT COUNT(*) FROM reviews WHERE rating IS NOT NULL';

  db.query(query, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error counting all reviews' });
    res.json({ count: parseInt(result.rows[0].count) });
  });
});

module.exports = router;