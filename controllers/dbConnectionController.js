var mysql = require('mysql');

//Instatiatesd MySQL pool object
var pool = mysql.createPool({
    host: 'localhost',
    port: '3306',
    user: 'course_user',
    password: 'tzPiitGvouUz4h4O',
    database: 'course_db'
  });

  //Creates a dynamic INSERT query string based on a given table name, value names, and values to insert
  var createInsertQueryString = function(table, valueNames, values) {
    var queryString = `INSERT INTO ${table} (`;
    valueNames.forEach(function(val, index) {
        queryString = queryString + val;
        if(index + 1 !== valueNames.length) {
            queryString = queryString + ',';
        }
    });

    queryString = queryString + ') VALUES(';
    
    values.forEach(function(val, index) {
        queryString = queryString + `'${val}'`
        if(index + 1 !== values.length) {
            queryString = queryString + ',';
        }
    });

    queryString = queryString + ');';

    return queryString;
  };

module.exports = {
    //Retrieves all data from a given table
    retreiveAllData: function(table, callback) {
        pool.getConnection(function(err, connection) {
            connection.connect();
            connection.query(`SELECT * FROM ${table}`, function(err, results, fields) {
                connection.release();
                callback(results);
            });
        });
    },
    //Inserts data to a given table
    insertDataGen: function(table, valueNames, values, callback) {
        pool.getConnection(function(err, connection) {
            connection.connect();

            connection.query(createInsertQueryString(table, valueNames, values), function(err, results, fields) {
                connection.release();
                callback();
            });
        });
      },

        //Retreives data from the COURSE table based on a given course number
        retreiveCourseData: function(course_num, callback) {
          pool.getConnection(function(err, connection) {
              connection.connect();

              connection.query(`SELECT * FROM COURSE WHERE COURSE_NUMBER = '${course_num}';`, function(err, results, fields) {
                  connection.release();
                  callback(results);
              });
          });
    }
};