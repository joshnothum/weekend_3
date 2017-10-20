var express = require('express');
var app = express();
var port = process.env.PORT || 5000;


var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

var queHacer = require('./routes/queHacer_router.js');
app.use('/queHacer', queHacer);

app.use(express.static('server/public'));
app.listen(port, function() {
    console.log('we are rocking out on port:', port);
    
});