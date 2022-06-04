var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static(__dirname + '/'));

app.get('/', function(req,res)
{
    res.sendFile(__dirname + '\\' + 'home.html');
});


var server = app.listen(3000, function()
{
    console.log("Listening at port 3000");
});