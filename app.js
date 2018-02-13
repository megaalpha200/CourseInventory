var express = require('express');
var menu = require('./controllers/menuController');
var addCourse = require('./controllers/addcourseController');
var searchCourse = require('./controllers/searchcourseController');

var app = express();
app.set('view engine', 'ejs');

app.use('/assets', express.static("public/assets"));

menu(app);
addCourse(app);
searchCourse(app);

app.listen(3000);
console.log("Now serving at port 3000");