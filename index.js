const express = require('express');
const app = new express();

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/galleryDB',
{useNewURLParser: true, useUnifiedTopology: true});

const fileUpload = require('express-fileupload');

const Post = require("./database/models/Post");
const path = require('path');

app.use(express.json());
app.use(express.urlencoded( {extended: true}));
app.use(express.static('public'));
app.use(fileUpload());

var hbs = require('hbs');
app.set('view engine','hbs');

