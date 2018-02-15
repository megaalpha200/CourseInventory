var dbController = require('./dbConnectionController');

bodyParser = require('body-parser');

var urlEncodedParser = bodyParser.urlencoded({extended: false}); //Instantiate body-parser

module.exports = function(app) {
    //Listens to GET request
    app.get('/addcourse', function(req, res) {
        res.render('addcourse'); //Displays the webpage
    });

    //Listens to POST request
    app.post('/addcourse', urlEncodedParser, function(req, res) {
        var formData = [req.body.COURSE_NUMBER, req.body.COURSE_TITLE, req.body.CREDIT_HOURS]; //Convert JSON object to array format
        var formDataValNames = ['COURSE_NUMBER', 'COURSE_TITLE', 'CREDIT_HOURS']; //Value names as created in SQL table
        
        //Send data to database
        dbController.insertDataGen('COURSE', formDataValNames, formData, function() {
            console.log("Success!");
        });
    });
};