var dbController = require('./dbConnectionController');

var bodyParser = require('body-parser');

var urlEncodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app) {
    app.get('/searchcourse', function(req, res) {
        res.render('searchcourse', {data: {show: false, resultsFound: false}});
    });

    app.post('/searchcourse', urlEncodedParser, function(req, res) {
        dbController.retreiveCourseData(req.body.COURSE_NUMBER, function(results) {
            if (results !== null && Object.keys(results).length !== 0) {
                res.render('searchcourse', { data: { show: true, resultsFound: true, formData: results[0] }});
            }
            else {
                res.render('searchcourse', {data: {show: true, resultsFound: false}});
            }
        });
    });
};