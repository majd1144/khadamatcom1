const express = require("express");
const router = express.Router();
const db = require("../../db-config");

//Data fetching for all workers in react app
router.get("/", (req, res) => {

    db.query(`SELECT workers.*,
                users.*,
                AVG(reviews.rating)::numeric(2,1) AS average_rating
                FROM workers
                JOIN users ON workers.userid = users.id
                LEFT JOIN reviews ON workers.id = reviews.workerid
                GROUP BY workers.id, users.id
                ORDER BY average_rating ASC;`
            , (err, results) => {
        if (err) {
            console.error("Error querying the database:", err.stack);
            res.json(500,"Somthing went wrong. Try again later!")
        }
        if (results.rows && results.rows.length > 0) {
            res.status(200).json(results.rows);}
    });
});

//Data fetching for one worker in react app
router.get("/:id", (req, res) => {
    const {id} = req.params;
    var stars = 0.0;
    const query = `SELECT AVG(rating)::numeric(2,1) AS average_rating
    FROM reviews WHERE workerid = $1 AND rating IS NOT NULL`;

    db.query(query, [id], (err, rslt) => {
    if (err) return res.status(500).json({ error: 'Error fetching average' });
        //stars rating calculation
        stars =rslt.rows[0].average_rating
    db.query(`SELECT workers.id AS worker_id, workers.userid, users.id AS user_id, users.firstname, users.lastname, users.role, users.governorate, users.picture,
        workers.servicecategory, workers.createdat, workers.experience, workers.bio, users.email, workers.fee, users.nationalid, users.birthdate, users.gender,
        users.phone FROM workers JOIN users ON workers.userid = users.id  WHERE workers.id = $1`, [id], (err, results) => {
        if (err) {
            console.error("Error querying the database:", err.stack);
        }
        if (results.rows && results.rows.length > 0) {
            res.status(200).json({
                id: results.rows[0].worker_id,
                userid: results.rows[0].userid,
                name: results.rows[0].firstname + " " + results.rows[0].lastname,
                servicecategory: results.rows[0].servicecategory,
                bio: results.rows[0].bio,
                experience: results.rows[0].experience,
                createdat: results.rows[0].createdat,
                fee: results.rows[0].fee,
                rating: stars,
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
});


//Data fetching for worker data from db where the id of user is provided
router.get("/users/:id", (req, res) => {
    const { id } = req.params;
    const detailsQuery = `SELECT workers.id AS worker_id, workers.userid, users.id AS user_id, users.firstname, users.lastname,
        users.role, users.governorate, users.picture, workers.servicecategory, workers.createdat, workers.experience, workers.bio,
        users.email, workers.fee, users.nationalid, users.birthdate, users.gender, users.phone FROM workers JOIN users ON workers.userid = users.id
        WHERE users.id = $1`;

    db.query(detailsQuery, [id], (err, results) => {
        if (err) {
            console.error("Error querying the database:", err.stack);
            return res.status(500).json({ error: "Database error" });
        }

        if (!results.rows || results.rows.length === 0) {
            return res.status(404).json({ message: `There is no worker with user ID: ${id}` });
        }

        const workerData = results.rows[0];
        const workerId = workerData.worker_id;
        const avgQuery = `SELECT AVG(rating)::numeric(2,1) AS average_rating FROM reviews WHERE workerid = $1 AND rating IS NOT NULL`;
        db.query(avgQuery, [workerId], (err, rslt) => {
            if (err) {
            console.error("Error fetching rating:", err.stack);
            return res.status(500).json({ error: "Error fetching rating" });
            }   
        const stars = rslt.rows[0].average_rating || 0.0;
        res.status(200).json({
            id: workerData.worker_id,
            userid: workerData.userid,
            name: `${workerData.firstname} ${workerData.lastname}`,
            servicecategory: workerData.servicecategory,
            bio: workerData.bio,
            experience: workerData.experience,
            createdat: workerData.createdat,
            fee: workerData.fee,
            rating: stars,
            nationalid: workerData.nationalid,
            email: workerData.email,
            role: workerData.role,
            governorate: workerData.governorate,
            phone: workerData.phone,
            birthdate: workerData.birthdate,
            gender: workerData.gender,
            picture: workerData.picture || null});
        });
    });
});



//Data fetching for all workers by service category in react app
router.get("/service/:servicecategory", (req, res) => {
    var {servicecategory} = req.params;
    servicecategory = servicecategory[0].toUpperCase() + servicecategory.slice(1);
    db.query(`SELECT  workers.id AS worker_id, workers.userid, workers.servicecategory, workers.bio, workers.experience,
    workers.fee, workers.createdat, users.id AS user_id, users.firstname, users.lastname, users.email, users.password, users.nationalid, users.phone, 
    users.birthdate, users.governorate, users.gender, users.role, users.picture, AVG(reviews.rating)::numeric(2,1) AS average_rating
    FROM workers  JOIN users ON workers.userid = users.id LEFT JOIN reviews ON workers.id = reviews.workerid
WHERE workers.servicecategory = $1 GROUP BY  workers.id, workers.userid, workers.servicecategory, workers.bio, workers.experience, workers.fee, workers.createdat, users.id, users.firstname, users.lastname, users.email, users.password, users.nationalid, users.phone, users.birthdate, users.governorate, users.gender, users.role, users.picture ORDER BY average_rating ASC;`
            ,[servicecategory], (err, results) => {
        if (err) {
            console.error("Error querying the database:", err.stack);
            res.json(500,"Somthing went wrong. Try again later!")
        }
        if (results.rows && results.rows.length > 0) {
            res.status(200).json(results.rows);}
    });
});


// Update worker and user info
router.patch("/:id", async (req, res) => {
    const { id } = req.params; // worker.id
    const {
        firstname,
        lastname,
        email,
        phone,
        governorate,
        bio,
        experience,
        fee,
        servicecategory,
    } = req.body;

    try {
        // Get the worker row to find the user id
        const { rows } = await db.query(
            "SELECT userid FROM workers WHERE id = $1",
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ error: "Worker not found" });
        }

        const userId = rows[0].userid;

        // Update users table
        await db.query(
            `UPDATE users SET firstname = $1, lastname = $2, email = $3, phone = $4, governorate = $5 WHERE id = $6`,
            [firstname, lastname, email, phone, governorate, userId]
        );

        // Update workers table
        await db.query(
            `UPDATE workers SET bio = $1, experience = $2, fee = $3, servicecategory = $4 WHERE id = $5`,
            [bio, experience, fee, servicecategory, id]
        );

        res.status(200).json({ message: "Worker profile updated successfully" });
    } catch (error) {
        console.error("Error updating worker info:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


module.exports = router;