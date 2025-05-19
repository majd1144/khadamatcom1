const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
require('dotenv').config();
const db = require('../db-config');
const path = require('path');
const passport = require("passport");
const session = require("express-session");
const adminRoutes = require ("./routes/adminRt");

//Express APP
const app = express();

//Craete a Session and inisialize it
app.use(session({
  secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false, cookie: {
    secure: false, httpOnly: true, sameSite: 'lax', maxAge: 1000 * 60 * 60 * 24} }));

//Encode or json any data comes from pages
app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//session started
app.use(passport.initialize());
app.use(passport.session());

//CORS for requests types
app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true,     
}));

//Export variables and routes
const port = process.env.PORT_SERVER;
const testdbRt = require("./routes/testdbRt");
const authRt = require("./routes/authRt");
const usersRt = require("./routes/usersRt");
const reviewsRt = require("./routes/reviewsRt");
const workersRt = require("./routes/workersRt");
const requestRoutes = require('./routes/service_requestRt');


//EJS using as engine
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'));

// Connect to the database
//db.connect().catch(err => console.error("Connection error:", err,));

//Any EJS paths must go here
app.use("/test_db", testdbRt);  

//route path for React
app.use(express.static("public"));

//Login and Join requests routes
app.use("/", authRt);

//Users requests routes
app.use("/users",usersRt);

//Workers requests routes
app.use("/workers",workersRt);

//reviews requests routes
app.use("/reviews", reviewsRt);

//requests requests routes
app.use("/requests", requestRoutes);
//admin request routes 
app.use("/admin", adminRoutes);



app.use(express.static(path.join(__dirname, 'build')));
/*app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});*/

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });