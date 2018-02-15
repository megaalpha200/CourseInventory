var dbController = require('./dbConnectionController');

var bodyParser = require('body-parser');

var urlEncodedParser = bodyParser.urlencoded({extended: false}); //Instantiate body-parser

module.exports = function(app) {

    /*
        JSON object used in the next lines can be described as follows:
        {
            data: {
                show: boolean, //Flag indicating whether to show the "results" part of the webpage or not
                resultsFound: boolean, //Flag indicating whether any data was retreived from the database or not
                formData: Object //JSON object holding the retreived data (if any)
            }
        }
    */
    
    //Listens to GET request
    app.get('/searchcourse', function(req, res) {
        res.render('searchcourse', {data: {show: false, resultsFound: false}}); //Displays the webpage and sends appropriate data to the webpage
    });

    //Listens to POST request
    app.post('/searchcourse', urlEncodedParser, function(req, res) {
        //Retreive data from database
        dbController.retreiveCourseData(req.body.COURSE_NUMBER, function(results) {
            if (results !== null && Object.keys(results).length !== 0) {
                //If results from the database are not empty, tell webpage to display the results
                res.render('searchcourse', { data: { show: true, resultsFound: true, formData: results[0] }}); //Displays the webpage and sends appropriate data to the webpage
            }
            else {
                //Else, no data was found and the webpage should display the appropriate message
                res.render('searchcourse', {data: {show: true, resultsFound: false}}); //Displays the webpage and sends appropriate data to the webpage
            }
        });
    });
};