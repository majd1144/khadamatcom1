// routes/account.js
const express = require('express');
const router = express.Router();
const db = require('../khadamatcom11/db-config');

// PATCH /account/:id — Unified update for user + worker
router.patch('/:id', async (req, res) => {
  console.log("🔥 PATCH /account/:id hit:", req.body);

  const userId = req.params.id;

  const {
    name,
    email,
    phone,
    location,
    birthDate,
    gender,
    role,
    jobType,
    price,
    bio,
    experience
  } = req.body;

  try {
    // --- Parse full name ---
    let firstName = null;
    let lastName = null;
    if (name) {
      const parts = name.trim().split(' ');
      firstName = parts[0];
      lastName = parts.slice(1).join(' ') || '';
    }

    // --- USERS TABLE ---
    const userFields = {
      ...(firstName && { firstname: firstName }),
      ...(lastName && { lastname: lastName }),
      ...(email && { email }),
      ...(phone && { phone }),
      ...(location && { governorate: location }),
      ...(birthDate && { birthdate: birthDate }),
      ...(gender && { gender }),
    };

    const userUpdates = [];
    const userValues = [];
    let index = 1;

    for (const key in userFields) {
      userUpdates.push(`${key} = $${index}`);
      userValues.push(userFields[key]);
      index++;
    }

    if (userUpdates.length > 0) {
      userValues.push(userId);
      await db.query(
        `UPDATE users SET ${userUpdates.join(', ')} WHERE id = $${userValues.length}`,
        userValues
      );
    }

    // --- WORKERS TABLE ---
    if (role === 'worker') {
      const workerFields = {
        ...(jobType && { servicecategory: jobType }),
        ...(price && { fee: price }),
        ...(bio && { bio }),
        ...(experience && { experience }),
      };

      const workerUpdates = [];
      const workerValues = [];
      index = 1;

      for (const key in workerFields) {
        workerUpdates.push(`${key} = $${index}`);
        workerValues.push(workerFields[key]);
        index++;
      }

      if (workerUpdates.length > 0) {
        const workerRes = await db.query('SELECT id FROM workers WHERE userid = $1', [userId]);
        if (workerRes.rows.length === 0) {
          return res.status(404).json({ error: 'Worker not found for this user' });
        }

        const workerId = workerRes.rows[0].id;
        workerValues.push(workerId);
        await db.query(
          `UPDATE workers SET ${workerUpdates.join(', ')} WHERE id = $${workerValues.length}`,
          workerValues
        );
      }
    }

    res.json({ message: '✅ Account updated successfully' });
  } catch (err) {
    console.error('❌ Unified update failed:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
