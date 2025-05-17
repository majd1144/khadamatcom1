const express = require("express");
const router = express.Router();
const db = require("../db-config");

//  GET all requests
router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM service_requests ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching requests" });
  }
});

//  GET request by ID
router.get("/:id", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM service_requests WHERE id = $1", [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ message: "Request not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Error" });
  }
});

//  GET requests by worker ID
router.get("/worker/:workerid", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM service_requests WHERE workerid = $1", [req.params.workerid]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: "Error" });
  }
});

//  GET requests by worker ID + status
router.get("/worker/:workerid/status/:status", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM service_requests WHERE workerid = $1 AND status = $2",
      [req.params.workerid, req.params.status]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: "Error" });
  }
});

//  GET requests by user ID
router.get("/user/:userid", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM service_requests WHERE userid = $1", [req.params.userid]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: "Error" });
  }
});

//  GET requests by user ID + status
router.get("/user/:userid/status/:status", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM service_requests WHERE userid = $1 AND status = $2",
      [req.params.userid, req.params.status]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: "Error" });
  }
});

//  POST new request
router.post("/", async (req, res) => {
  const { userid, workerid, servicedate, status, urgency } = req.body;
  try {
    const result = await db.query(
      `INSERT INTO service_requests (userid, workerid, servicedate, status, urgency, createdat)
       VALUES ($1, $2, $3, $4, $5, NOW())
       RETURNING *`,
      [userid, workerid, servicedate, status, urgency]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create request" });
  }
});

//  PATCH update request by ID
router.patch("/:id", async (req, res) => {
  const { status, servicedate, urgency } = req.body;
  const id = req.params.id;

  try {
    const result = await db.query(
      `UPDATE service_requests
       SET status = COALESCE($1, status),
           servicedate = COALESCE($2, servicedate),
           urgency = COALESCE($3, urgency)
       WHERE id = $4
       RETURNING *`,
      [status, servicedate, urgency, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: "Request not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Error updating request" });
  }
});

//  DELETE request by ID
router.delete("/:id", async (req, res) => {
  try {
    const result = await db.query("DELETE FROM service_requests WHERE id = $1 RETURNING *", [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ message: "Request not found" });
    res.json({ message: "Request deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting request" });
  }
});

module.exports = router;