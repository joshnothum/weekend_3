var express = require('express');
var router = express.Router();

var pg = require('pg');
var queHacer = express.Router();

var config = {
    database: 'Deneb', // the name of the database
    host: 'localhost', // where is your database?
    port: 5432, // the port number for you database, 5432 is the default
    max: 10, // how many connections at one time
    idleTimeoutMillis: 30000 // Close idle connections to db after
};
var pool = new pg.Pool(config);

queHacer.get('/', function (req, res) {
    // Attempt to connect to the database
    pool.connect(function (errorConnectingToDb, db, done) {
        if (errorConnectingToDb) {
            // There was an error and no connection was made
            console.log('Error connecting', errorConnectingToDb);
            res.sendStatus(500);
        } else {
            // We connected to the db!!!!! pool -1
            var queryText = 'SELECT * FROM "quehacer";';
            db.query(queryText, function (errorMakingQuery, result) {
                // We have received an error or result at this point
                done(); // pool +1
                if (errorMakingQuery) {
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    //console.log(result);
                    //console.log(result.rows);
                    
                    
                    res.send(result.rows);
                }
            }); // END QUERY
        }
    }); // END POOL
}); // END GET ROUTE

queHacer.post('/', function (req, res) {
    // Attempt to connect to the database
    var newTask = req.body;
    console.log(newTask);
    
    pool.connect(function (errorConnectingToDb, db, done) {
        if (errorConnectingToDb) {
            // There was an error and no connection was made
            console.log('Error connecting', errorConnectingToDb);
            res.sendStatus(500);
        } else {
            // We connected to the db!!!!! pool -1
            var queryText = 'INSERT INTO "quehacer" (task, status) VALUES ($1, $2);';
            console.log(queryText);
            
            db.query(queryText,[newTask.task, newTask.status], function (errorMakingQuery, result) {
                // We have received an error or result at this point
                done(); // pool +1
                if (errorMakingQuery) {
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    console.log(result.rows);


                    res.send(req.body);
                }
            }); // END QUERY
        }
    }); // END POOL
}); // END POST ROUTE

queHacer.delete('/:id', function (req, res) {
    // Attempt to connect to the database
    var taskID = req.params.id;
    console.log(taskID);

    pool.connect(function (errorConnectingToDb, db, done) {
        if (errorConnectingToDb) {
            // There was an error and no connection was made
            console.log('Error connecting', errorConnectingToDb);
            res.sendStatus(500);
        } else {
            // We connected to the db!!!!! pool -1
            var queryText = 'DELETE FROM "quehacer" WHERE "id" = $1';
            console.log(queryText);

            db.query(queryText, [taskID], function (errorMakingQuery, result) {
                // We have received an error or result at this point
                done(); // pool +1
                if (errorMakingQuery) {
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    console.log(result.rows);


                    res.send(req.body);
                }
            }); // END QUERY
        }
    }); // END POOL
}); // END DELETE ROUTE

queHacer.put('/:id', function (req, res) {
    // Attempt to connect to the database
    var taskID = req.params.id;
    console.log(taskID);

    pool.connect(function (errorConnectingToDb, db, done) {
        if (errorConnectingToDb) {
            // There was an error and no connection was made
            console.log('Error connecting', errorConnectingToDb);
            res.sendStatus(500);
        } else {
            // We connected to the db!!!!! pool -1
            var queryText = 'DELETE FROM "quehacer" WHERE "id" = $1';
            console.log(queryText);

            db.query(queryText, [taskID], function (errorMakingQuery, result) {
                // We have received an error or result at this point
                done(); // pool +1
                if (errorMakingQuery) {
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    console.log(result.rows);


                    res.send(req.body);
                }
            }); // END QUERY
        }
    }); // END POOL
}); // END DELETE ROUTE

module.exports = queHacer;