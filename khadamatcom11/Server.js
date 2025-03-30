const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
require('dotenv').config();
const db = require('./db-config');
const path = require('path');
const passport = require("passport");
const session = require("express-session");

//Express APP
const app = express();


//Craete a Session and inisialize it
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

//Encode or json any data comes from pages
app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//session started
app.use(passport.initialize());
app.use(passport.session());

//CORS for requests types
app.use(cors( {
  origin: '*',  // Allow requests from any origin for testing
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these methods
  allowedHeaders: ['Content-Type', 'Accept', 'Authorization'] // Ensure the proper headers are allowed
}));

//Export variables and routes
const port = process.env.PORT_SERVER;
const testdbRt = require("./routes/testdbRt");
const authRt = require("./routes/authRt");

//EJS using as engine
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'));


// Connect to the database
db.connect().catch(err => console.error("Connection error:", err,));


//Any EJS paths must go here
app.use("/test_db", testdbRt);  
app.use("/secret",(req,res)=>{
  if (req.isAuthenticated()) {
    const name = req.user.firstname +" "+ req.user.lastname
    const em = req.user.email
    res.send(`Hi ${name} you are authenticated! and your email is : ${em}`);
  } else {
    res.redirect("/login");
  }
})


//route path for React
app.use(express.static(path.join(__dirname, 'build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.use(express.static("public"));

//Default routes for homepage
app.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ authenticated: true, username: req.user.first_name });
  } else {
    res.json({ authenticated: false });
  }
});

//Login and Join requests routes
app.use("/", authRt);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });