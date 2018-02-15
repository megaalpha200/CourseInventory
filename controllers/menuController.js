module.exports = function(app) {
    //Listens to GET request
    app.get('/', function(req, res) {
        res.render('menu'); //Displays the webpage
    });
};