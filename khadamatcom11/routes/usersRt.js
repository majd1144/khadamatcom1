const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../db-config");

//Data fetching for logged-in users in
// Updated /loggedin_user route — fetches fresh data from DB
router.get("/loggedin_user", async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ authenticated: false });
  }

  try {
    const userId = req.user.id;

    const result = await db.query("SELECT * FROM users WHERE id = $1", [userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = result.rows[0];

    res.json({
      id: user.id,
      authenticated: true,
      name: user.firstname + " " + user.lastname,
      email: user.email,
      role: user.role,
      nationalid: user.nationalid,
      governorate: user.governorate,
      phone: user.phone,
      birthdate: user.birthdate,
      gender: user.gender,
      createdat: user.createdat,
      picture: user.picture || null,
    });
  } catch (err) {
    console.error("Error fetching fresh user:", err);
    res.status(500).json({ message: "Failed to fetch user" });
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

router.patch("/:id", async (req, res) => {
  const userId = req.params.id;
  const updates = req.body;

  try {
    const fields = [];
    const values = [];
    let index = 1;

    // Handle other fields dynamically
    for (const [key, value] of Object.entries(updates)) {
      fields.push(`${key} = $${index}`);
      values.push(value);
      index++;
    }

    if (fields.length === 0) {
      return res.status(400).json({ message: "No valid fields to update" });
    }

    const query = `
      UPDATE users
      SET ${fields.join(", ")}
      WHERE id = $${index}
      RETURNING id, email, firstname, lastname, role, governorate, phone, picture
    `;
    values.push(userId);

    const result = await db.query(query, values);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Failed to update user" });
  }
});



router.patch("/:id/password", async (req, res) => {
  const { id } = req.params;
  const { oldPassword, newPassword } = req.body;

  try {
    // Get existing hashed password from DB
    const result = await db.query("SELECT password FROM users WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = result.rows[0];

    // Compare old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    // Hash new password and update
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await db.query("UPDATE users SET password = $1 WHERE id = $2", [hashedPassword, id]);

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Error updating password:", err);
    res.status(500).json({ message: "Failed to update password" });
  }
});


module.exports = router;