const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

module.exports = function(passport) {

  passport.serializeUser(function(user, callback) {
    callback(null, user.id);
  });

  passport.deserializeUser(function(id, callback) {
    User.findById(id, function(err, user) {
      callback(err, user);
    })
  });

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, function(req, email, password, callback) {
    console.log('function ran');
    // Find a user with given email
    //console.log("email  " + email);
    //console.log("password  " + password);
    User.findOne({
      'local.email': email
    }, function(err, user) {
      if (err) return callback(err);
      //console.log("no mongo error");

      // If user already exists
      if (user) {
        //console.log('user exists');
        return callback(null, false, req.flash('signupMessage', "This email is already used."));
      } else {
        // User doesn't exist
        // Create new User
        let newUser = new User();
        newUser.local.email = email;
        newUser.local.password = newUser.hash(password);

        newUser.save(function(err) {
          if (err) throw err;
          return callback(null, newUser);
        });
      }
    });
  }));

  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, function(req, email, password, callback) {
    // Search for a user with this email
    User.findOne({
      'local.email': email
    }, function(err, user) {
      if (err) {
        return callback(err);
      }

      // If no user is found
      if (!user) {
        return callback(null, false, req.flash('loginMessage', 'Invalid Username or Password'));
      }
      // Wrong password
      if (!user.validPassword(password)) {
        //return callback(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
        return callback(null, false, req.flash('loginMessage', 'Invalid Username or Password'));
      }

      return callback(null, user);
    });
  }));
};
