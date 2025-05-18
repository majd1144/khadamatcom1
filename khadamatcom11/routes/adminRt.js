// routes/adminRt.js
const express = require("express");
const router = express.Router();
const db = require("../../db-config");

// ---------------- USERS ----------------
router.get("/users", async (req, res) => {
  try {
    const result = await db.query("SELECT id, firstname, lastname, email, role, governorate, createdat FROM users");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Failed to load users" });
  }
});

router.patch("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  try {
    const result = await db.query("UPDATE users SET role = $1 WHERE id = $2 RETURNING *", [role, id]);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ error: "Update failed" });
  }
});

router.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM users WHERE id = $1", [id]);
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ error: "Delete failed" });
  }
});

// ---------------- WORKERS ----------------
router.get("/workers", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM workers");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching workers:", err);
    res.status(500).json({ error: "Failed to load workers" });
  }
});

router.patch("/workers/:id", async (req, res) => {
  const { id } = req.params;
  const { servicecategory, fee } = req.body;
  try {
    const result = await db.query(
      "UPDATE workers SET servicecategory = $1, fee = $2 WHERE id = $3 RETURNING *",
      [servicecategory, fee, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Error updating worker:", err);
    res.status(500).json({ error: "Update failed" });
  }
});

router.delete("/workers/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM workers WHERE id = $1", [id]);
    res.status(200).json({ message: "Worker deleted" });
  } catch (err) {
    console.error("Error deleting worker:", err);
    res.status(500).json({ error: "Delete failed" });
  }
});

// ---------------- BOOKINGS ----------------
router.get("/bookings", async (req, res) => {
  try {
    const result = await db.query(`
      SELECT sr.id, sr.userid, sr.workerid, sr.servicetype, sr.description, sr.status, sr.date, sr.time,
             u.firstname AS user_firstname, u.lastname AS user_lastname,
             w.servicecategory AS worker_service, w.fee
      FROM service_requests sr
      JOIN users u ON sr.userid = u.id
      JOIN workers w ON sr.workerid = w.id
      ORDER BY sr.date DESC, sr.time DESC
    `);

    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching bookings:", err);
    res.status(500).json({ error: "Failed to load bookings" });
  }
});

// Get all reviews
router.get("/reviews", async (req, res) => {
  try {
    const result = await db.query(`
      SELECT reviews.id, reviews.comment, reviews.rating, reviews.createdat,
             workers.id AS workerid, users.id AS userid,
             u.firstname || ' ' || u.lastname AS userName,
             w.firstname || ' ' || w.lastname AS workerName
      FROM reviews
      JOIN users u ON reviews.userid = u.id
      JOIN workers w ON reviews.workerid = w.id
    `);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching reviews:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Delete a review
router.delete("/reviews/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.query(`DELETE FROM reviews WHERE id = $1`, [id]);
    res.status(200).json({ message: "Review deleted" });
  } catch (err) {
    console.error("Error deleting review:", err);
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;
