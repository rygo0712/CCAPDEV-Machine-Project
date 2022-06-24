/******* Initializations ************/ 

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const session = require('express-session');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo');

// For File Uploads
const fileUpload = require('express-fileupload');

// Post initializations. 1, the schema model, the path directory for file uploads, and a static resource folder //
const path = require('path'); // Local path directory for our static resource folder

// using handlebars 
const hbs = require('hbs');

// Using body parser for form input
const bodyParser = require('body-parser');

// Using routes
const routes = require('./routes/routes.js');

// Using db functions
const db = require('./models/db.js');


/********* Using initializations **********/

// Initializing the express app
const app = express();

// Setting bodyParser
app.use(bodyParser.urlencoded({ extended: true }));

// Setting hbs and registering partials for rendering
app.set('view engine','hbs');
hbs.registerPartials(__dirname + '/views/partials');

// Setting dotenv and port
dotenv.config();
port = process.env.PORT;
hostname = process.env.HOSTNAME;
mongoURI = process.env.DB_URL;

// Initialize data and static folder that our app will use
app.use(express.json()); // Use JSON throughout our app for parsing
app.use(express.urlencoded( {extended: true})); // Information consists of more than just strings
app.use(express.static('public')); // static directory name, meaning that the application will also refer to a folder named 'public'
app.use(express.static(__dirname + '/public'));//use to apply css
app.use(express.static(__dirname + '/'));//use to apply css
app.use(fileUpload()); // for fileuploading
app.use('/', routes); // Use the routes folder to process requests

// Sessions
app.use(session({
    secret: process.env.SESSION_SECRET,
    store: MongoStore.create({ mongoUrl: mongoURI }),
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 * 14 }
  }));

// Flash
app.use(flash());

// Global messages vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});

/** Setting server */

db.connect();

var server = app.listen(port, hostname, function()
{
    console.log("Server is running at: ");
    console.log("http://" + hostname + ":" + port);
});