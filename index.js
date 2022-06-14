const express = require('express');
const app = new express();

/***************** Where we will use mongoose */
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/galleryDB',
{useNewURLParser: true, useUnifiedTopology: true}); // Create database connection

// For File Uploads
const fileUpload = require('express-fileupload');

// Post initializations. 1, the schema model, the path directory for file uploads, and a static resource folder //
const path = require('path'); // Local path directory for our static resource folder

// Using Schema models
const Post = require('./database/models/Post');
const Comment = require('./database/models/Comment');
const Profile = require('./database/models/Profile');
const User = require('./database/models/User');


// Initialize data and static folder that our app will use
app.use(express.json()); // Use JSON throughout our app for parsing
app.use(express.urlencoded( {extended: true})); // Information consists of more than just strings
app.use(express.static('public')); // static directory name, meaning that the application will also refer to a folder named 'public'
app.use(express.static(__dirname + '/public'));//use to apply css
app.use(express.static(__dirname + '/'));//use to apply css
app.use(fileUpload()); // for fileuploading

/* using handlebars */
var hbs = require('hbs');
app.set('view engine','hbs');

app.post('/login-post', function(req, res) 
{
	res.sendFile(__dirname + '\\views\\' + 'home.html');  // placeholder before implementing login authentication
});

app.get('/', function(req,res)
{
    res.sendFile(__dirname + '\\views\\' + 'index.html');
});

app.get('/homepage', function(req,res)
{
    res.sendFile(__dirname + '\\views\\' + 'home.html');
});

app.get('/signin', function(req,res)
{
    res.sendFile(__dirname + '\\views\\' + 'signin.html');
});

app.get('/editprofile', function(req,res)
{
    res.sendFile(__dirname + '\\views\\' + 'edit_profile.html');
});

app.get('/viewprofile', function(req,res)
{
    res.sendFile(__dirname + '\\views\\' + 'view_profile.html');
});

app.get('/viewpost', function(req,res)
{
    res.sendFile(__dirname + '\\views\\' + 'view_post.html');
});

app.get('/viewpost2', function(req,res)
{
    res.sendFile(__dirname + '\\views\\' + 'view_post2.html');
});

var server = app.listen(3000, function()
{
    console.log("Listening at port 3000");
});