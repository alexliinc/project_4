const passport = require('passport');
const db = require('../models');

// GET /signup
function getSignup(request, response) {
  response.render('signup.ejs', {
    message: request.flash('signupMessage')
  });
}

// POST /signup
function postSignup(request, response, next) {
  // Save a new User
  let signupStrategy = passport.authenticate('local-signup', {
    successRedirect: '/userProfile',
    failureRedirect: '/signup',
    failureFlash: true
  });

  return signupStrategy(request, response, next);
}

// GET /login
function getLogin(request, response) {
  response.render('login.ejs', {
    message: request.flash('loginMessage')
  });
}

// POST /login
function postLogin(request, response, next) {
  var loginProperty = passport.authenticate('local-login', {
    successRedirect: '/userProfile',
    failureRedirect: '/login',
    failureFlash: true
  });

  return loginProperty(request, response, next);
}

// GET /logout
function getLogout(request, response) {
  request.logout();
  response.redirect('/');
}

// Restricted page
function userProfile(request, response) {
  response.render('user_profile.ejs');
}

function addStadium(request, response) {
  // this code will add stadiums to a user
  //console.log(request.user._id);
  //console.log(request.user.local.email);
  //console.log(request.body);
  console.log(request);

  db.User.findOne({
    _id: request.user._id
  }, function(err, user) {
    //user.stadiums.push("5984d5c2421b0b0ece6a158e");
    //user.save();
    response.json(user);
  });
}

function vistedStadium(request, response) {
  console.log('userFavorites');
  console.log(request.body);
  db.User.findOne({
    _id: request.user._id
  }, function(err, user) {
    user.stadiums.push(request.body.stadiumId);
    user.save();
    response.json(user);
  });
}

function unvistedStadium(request, response) {
  console.log('unvistedStadium');
  console.log(request.body.stadiumId);
  db.User.findOne({
    _id: request.user._id
  }, function(err, user) {
    for (var i = 0; i < user.stadiums.length; i++)
      if (user.stadiums[i].title === request.body.stadiumId) {
        user.stadiums.splice(i, 1);
        user.save();
        break;
      }
    response.json(user);
  });
}

function userVistedStadium(request, response) {
  // db.User.findOne({
  //   _id: request.user._id
  // }, function(err, user) {
  //   response.json(user);
  // });

  // db.User.findOne({
  //   _id: request.user._id
  // }, function(err, user) {
  //   let stadiumNames = [];
  //   for (var i = 0; i < user.stadiums.length; i++) {
  //     db.Stadium.findOne({
  //       _id: user.stadiums[i]
  //     }, function(err, stadium) {
  //       stadiumNames.push(stadium.title);
  //       console.log("each stadium: " + stadiumNames);
  //     });
  //   }
  //
  //   console.log("All stadiums: " + stadiumNames);
  //   response.json(stadiumNames);
  // });

  db.User.findOne({
    _id: request.user._id
  }, function(err, user) {
    function getPromises() {

      var promiseArray = [];

      for (let i = 0; i < user.stadiums.length; i++) {
        var gettingDataAtSomePoint = new Promise(
          function(resolve, reject) {
            //setTimeout(resolve("hi!"), 2000);
            //--> this might something you'll want to do.
            // db.Hi.find({}, function(err, found) {
            //     resolve(found);
            // });
            db.Stadium.findOne({
              _id: user.stadiums[i]
            }, function(err, found) {
              resolve(found);
            });
          }
        );
        promiseArray.push(gettingDataAtSomePoint);
      }

      return promiseArray;
    }


    var promisesThatAreNotFinished = getPromises();

    //--> not actual values yet!
    //console.log("these are not ready yet!");
    //console.log(promisesThatAreNotFinished);

    Promise.all(promisesThatAreNotFinished).then(data => {
      //console.log("all of our promises are done! We can now send a json response");
      //console.log(data);

      response.json(data);
    });
  });
}



module.exports = {
  getLogin: getLogin,
  postLogin: postLogin,
  getSignup: getSignup,
  postSignup: postSignup,
  getLogout: getLogout,
  userProfile: userProfile,
  addStadium: addStadium,
  vistedStadium: vistedStadium,
  unvistedStadium: unvistedStadium,
  userVistedStadium: userVistedStadium
}
