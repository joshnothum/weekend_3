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


module.exports = queHacer;