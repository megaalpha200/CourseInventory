var dbController = require('./dbConnectionController');

bodyParser = require('body-parser');

var urlEncodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app) {
    app.get('/addcourse', function(req, res) {
        res.render('addcourse');
    });

    app.post('/addcourse', urlEncodedParser, function(req, res) {
        var formData = [req.body.COURSE_NUMBER, req.body.COURSE_TITLE, req.body.CREDIT_HOURS];
        var formDataValNames = ['COURSE_NUMBER', 'COURSE_TITLE', 'CREDIT_HOURS'];
        dbController.insertDataGen('COURSE', formDataValNames, formData, function() {
            console.log("Success!");
        });
        console.log(formData);
    });
};