const express = require("express");
const router = express.Router();
const db = require("../db-config");

// Helper: select request + worker info
const baseQuery = `
  SELECT r.*, w.servicecategory, w.fee, u.firstname, u.lastname
  FROM service_requests r
  LEFT JOIN workers w ON r.workerid = w.id
  LEFT JOIN users u ON r.userid = u.id
`;

// GET all requests
router.get("/", async (req, res) => {
  try {
    const result = await db.query(`${baseQuery} ORDER BY r.id ASC`);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching requests" });
  }
});

// GET request by ID
router.get("/:id", async (req, res) => {
  try {
    const result = await db.query(`${baseQuery} WHERE r.id = $1`, [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ message: "Request not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Error" });
  }
});

// GET requests by worker ID
router.get("/workers/:workerid", async (req, res) => {
  try {
    const result = await db.query(`${baseQuery} WHERE r.workerid = $1 ORDER BY r.createdat DESC`, [req.params.workerid]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: "Error" });
  }
});

// GET requests by worker ID + status
router.get("/workers/:workerid/status/:status", async (req, res) => {
  try {
    const result = await db.query(
      `${baseQuery} WHERE r.workerid = $1 AND r.status = $2 ORDER BY r.createdat DESC`,
      [req.params.workerid, req.params.status]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: "Error" });
  }
});

router.get("/users/:userid", async (req, res) => {
  try {
    const query = `
      SELECT 
        r.*,
        w.servicecategory,
        w.fee,
        wu.firstname AS worker_firstname,
        wu.lastname AS worker_lastname,
        u.firstname AS requester_firstname,
        u.lastname AS requester_lastname
      FROM service_requests r
      LEFT JOIN workers w ON r.workerid = w.id
      LEFT JOIN users wu ON w.userid = wu.id
      LEFT JOIN users u ON r.userid = u.id
      WHERE r.userid = $1
      ORDER BY r.createdat DESC
    `;
    const result = await db.query(query, [req.params.userid]);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching requests by user:", err);
    res.status(500).json({ message: "Error" });
  }
});

// GET requests by user ID + status
router.get("/users/:userid/status/:status", async (req, res) => {
  try {
    const query = `
      SELECT 
        r.*,
        w.servicecategory,
        w.fee,
        wu.firstname AS worker_firstname,
        wu.lastname AS worker_lastname,
        u.firstname AS requester_firstname,
        u.lastname AS requester_lastname
      FROM service_requests r
      LEFT JOIN workers w ON r.workerid = w.id
      LEFT JOIN users wu ON w.userid = wu.id
      LEFT JOIN users u ON r.userid = u.id
      WHERE r.userid = $1 AND r.status = $2
      ORDER BY r.createdat DESC
    `;
    const result = await db.query(query, [req.params.userid, req.params.status]);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching requests by user and status:", err);
    res.status(500).json({ message: "Error" });
  }
});

// POST new request
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

router.patch("/:id", async (req, res) => {
  const { status, servicedate, urgency } = req.body;
  const id = req.params.id;

  const validStatuses = ["pending", "accepted", "rejected", "completed"];
  if (status && !validStatuses.includes(status.toLowerCase())) {
    return res.status(400).json({ message: "Invalid status value" });
  }

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
    console.error(err);
    res.status(500).json({ message: "Error updating request" });
  }
});


// DELETE request by ID
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
