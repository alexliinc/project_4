const express = require('express');
const app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

/************
 * DATABASE *
 ************/

// var db = require('./models');

/**********
 * ROUTES *
 **********/

// Using public folder to reference css and js and imgs
app.use(express.static(__dirname + '/public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

/**********
 * SERVER *
 **********/

// listen on port 3000
//app.listen(process.env.PORT || 3000)
app.listen(process.env.PORT || 3000, function() {
  console.log('Express server is up');
});
