const express = require('express');
// Use the controller to process requests
const controller = require('../controllers/controller.js');

const app = express();

/** TODO: Replace these with function calls to controller.js */
app.post('/login-post', function(req, res) 
{
	res.sendFile(__dirname + '\\views\\' + 'home.html');  // placeholder before implementing login authentication
});

app.get('/', controller.getIndex);

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

module.exports = app;