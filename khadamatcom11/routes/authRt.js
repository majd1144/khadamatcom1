const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const { Strategy } = require("passport-local");
const db = require('../db-config');
require('dotenv').config();
const saltRounds = 10;


passport.serializeUser((user, cb) => {cb(null, user);});
passport.deserializeUser((user, cb) => {cb(null, user);});

//Join requests
router.get("/Join", (req, res) => {
    res.render("Join.jsx");
});


router.post("/Join", async (req, res) => {
    const {firstname, lastName, nationalID, email, phone, location,  password, confirmPassword, birthDate, gender, userType }= req.body;

    //Check whether user input is valid or not
    if (!email) {
        return res.status(400).json({ error: "Email is required." });
    }
    if (!nationalID) {
        return res.status(400).json({ error: "National ID is required." });
    }
    if (!firstname) {
        return res.status(400).json({ error: "First name is required." });
    }
    if (!lastName) {
        return res.status(400).json({ error: "Last name is required." });
    }

    if (firstname.length < 3) {
        return res.status(400).json({ error: "First name must be at least 3 characters long." });
    }
    if (lastName.length < 3) {
        return res.status(400).json({ error: "Last name must be at least 3 characters long." });
    }


    // Validate Email Format (must contain "@" and ".")
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format. Please enter a valid email address." });
    }

    // Validate National ID (must be exactly 10 digits)
    const nationalIDRegex = /^\d{10}$/;
    if (!nationalIDRegex.test(nationalID)) {
        return res.status(400).json({ error: "Invalid National ID. It must be exactly 10 digits." });
    }
    
    // Validate phone
    const phoneRegex = /^\d{10,13}$/;
    if (!phoneRegex.test(phone)) {
        return res.status(400).json({ error: "Please enter valid phone number." });
    }

    // Validate password
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({
            error: "Password must contain at least one letter, one number, and one special character, and be at least 8 characters long."
        });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match." });
    }

    //Validate gender
    const normalizedGender = gender ? gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase() : '';
    //const normalizedUserType = userType ? userType.charAt(0).toUpperCase() + userType.slice(1).toLowerCase() : '';

    //Validate roles used
    const validRoles = ["client", "worker", "admin"];
    const normalizedUserType = userType ? userType.toLowerCase() : '';
    
    if (!validRoles.includes(normalizedUserType)) {
        return res.status(400).json({ error: "Invalid role. Allowed roles: client, worker, admin." });
    }

    //Main validation
    if (!firstname || !lastName || !nationalID || !email || !phone || !location || !password || !confirmPassword || !birthDate || !gender || !userType) {
        return res.status(400).json({ error: "All fields are required." });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match." });
    }

    try {
        const hashedPassword = await bcrypt.hash(password,saltRounds);
        const query = ( "INSERT INTO users (firstname, lastname, nationalid, email, governorate, phone, password, birthdate, gender, role) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *; "  ) ;

        const values = [ firstname, lastName, nationalID, email, location, phone, hashedPassword, birthDate, normalizedGender, normalizedUserType];


        const result = await db.query(query, values,(err)=>{
            if(err){
                console.log("error in query");
            }
        });

        res.status(201).json({
            message: "Registration successful!",
        });

    } catch (err) {
        console.error("Error saving user:", err);
        if (err.code === "23505") { // PostgreSQL unique constraint violation
            res.status(400).json({ error: "Email or National ID already exists." });
        } else {
            res.status(500).json({ error: "An error occurred. Please try again." });
        }
    }
});


//Login requests
router.get("/Login", (req, res) => {
    res.render("Login.jsx");
});

// Passport Strategy (Login Logic)
passport.use(
    new Strategy(async (username, password, done) => {
    try {
        const result = await db.query("SELECT * FROM users WHERE email = $1", [username]);

        if (result.rows.length > 0) {
        const user = result.rows[0];

          // Compare hashed password
        bcrypt.compare(password, user.password, (err, valid) => {
            if (err) return done(err);
            if (valid) return done(null, user); // Login successful
            return done(null, false, { message: "Incorrect password" }); // Wrong password
        });
        } else {
          return done(null, false, { message: "User not found" }); // No user found
        }
    } catch (err) {
        return done(err);
    }
    })
);

// Serialize & Deserialize User (for session handling)
passport.serializeUser((user, done) => {
    done(null, user.id);  // Store only the user ID in the session
});

passport.deserializeUser(async (id, done) => {
    try {
      const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
        if (result.rows.length > 0) {
        done(null, result.rows[0]);  // Retrieve full user data based on the ID
        } else {
        done(null, false);
        }
    } catch (err) {
        done(err);
    }
});

  // Login Route with Passport Callback
router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
    if (err) return res.status(500).json({ message: "Server error" });

    if (!user) {
        return res.status(400).json({ message: info.message || "Login failed" });
    }

    req.login(user, (err) => {
        if (err) return res.status(500).json({ message: "Login error" });

        res.status(200).json({ message: "Login successful", username: user.email });
        req.session.cookie.maxAge = 1000 * 60 * 60 * 24;
    });
    })(req, res, next);
});

//Data fetching for users in react app
router.get("/user", (req, res) => {
    console.log("User session:", req.user);  // Logs the user info stored in the session
    if (req.isAuthenticated()) {
        res.json({
            authenticated: true,
            name: req.user.firstname + " " + req.user.lastname,
            email: req.user.email,
            role: req.user.role,
            userprofile: req.user.userprofile || null
        });
    } else {
        res.status(401).json({ authenticated: false });
    }
});
//Loging out route
router.post("/logout", (req, res) => {
    req.logout(function(err) {
        if (err) {
            return res.status(500).json({ message: "Logout failed" });
        }

        req.session.destroy(() => {
            res.clearCookie("connect.sid"); // optional: clear cookie on logout
            res.status(200).json({ message: "Logged out successfully" });
        });
    });
});



module.exports = router; // Export the router
