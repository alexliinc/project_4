const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');


/************
 * DATABASE *
 ************/

// mongoose.connect('mongodb://localhost/sporty');
const db = require('./models');

/************
 * Passport *
 ************/

app.use(morgan('dev'));
app.use(cookieParser());

app.use(session({
  secret: 'supersecret'
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./config/passport')(passport);

/*************
 * BodyParser *
 *************/

// parse incoming urlencoded form data
// and populate the req.body object
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

/*********
 * Views *
 *********/

app.set('views', './views');
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

/**********
 * ROUTES *
 **********/

// Using public folder to reference css and js and imgs
app.use(express.static(__dirname + '/public'));
/*
 * HTML Endpoints
 */
// app.get('/', function homepage(req, res) {
//   res.sendFile(__dirname + '/views/index.html');
// });

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

var routes = require('./config/routes');
app.use(routes);


/**********
 * SERVER *
 **********/

// listen on port 3000
//app.listen(process.env.PORT || 3000)
app.listen(process.env.PORT || 3000, function() {
  console.log('Express server is up');
});
