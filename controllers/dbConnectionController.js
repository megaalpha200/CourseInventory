var mysql = require('mysql');

var pool = mysql.createPool({
    host: 'localhost',
    port: '3306',
    user: 'course_user',
    password: 'tzPiitGvouUz4h4O',
    database: 'course_db'
  });

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
    retreiveAllData: function(table, callback) {
        pool.getConnection(function(err, connection) {
            connection.connect();
            connection.query(`SELECT * FROM ${table}`, function(err, results, fields) {
                connection.release();
                callback(results);
            });
        });
    },
    insertDataGen: function(table, valueNames, values, callback) {
        pool.getConnection(function(err, connection) {
            connection.connect();

            connection.query(createInsertQueryString(table, valueNames, values), function(err, results, fields) {
                connection.release();
                callback();
            });
        });
      },

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