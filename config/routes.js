const express = require('express');
const router = express.Router();
// Parses information from POST
const bodyParser = require('body-parser');
// Used to manipulate POST methods
const methodOverride = require('method-override');
const passport = require("passport");
const usersController = require('../controllers/users');
const staticsController = require('../controllers/statics');
const stadiumController = require('../controllers/stadiumController');
const playerController = require('../controllers/playerController');

function authenticatedUser(req, res, next) {
  // If the user is authenticated, then we continue the execution
  if (req.isAuthenticated()) {
    return next();
  }
  // Otherwise the request is always redirected to the home page
  res.redirect('/');
}

router.route('/')
  .get(staticsController.home);

router.route('/signup')
  .get(usersController.getSignup)
  .post(usersController.postSignup)

router.route('/login')
  .get(usersController.getLogin)
  .post(usersController.postLogin)

router.route('/logout')
  .get(usersController.getLogout)

router.route('/userProfile')
  .get(authenticatedUser, usersController.userProfile)
  .post(authenticatedUser, usersController.addStadium)

router.route('/userProfile/vistedStadium')
  .get(authenticatedUser, usersController.userVistedStadium)
  .post(authenticatedUser, usersController.vistedStadium)

router.route('/userProfile/unvistedStadium')
  .post(authenticatedUser, usersController.unvistedStadium)

// Getting all stadiums
router.route('/api/stadiums')
  .get(stadiumController.getAll)

//Getting all your Player
router.route('/players')
  .get(authenticatedUser, playerController.renderPlayer)
  .post(authenticatedUser, playerController.addNewPlayer)
  .put(authenticatedUser, playerController.updatePlayer)


//deleting your Player
router.route('/players/:id')
  .get(authenticatedUser, playerController.removePlayer)
  .delete(authenticatedUser, playerController.removePlayer)

//Getting all your Player
router.route('/players/showAllPlayers')
  .get(authenticatedUser, playerController.showAllPlayers)


module.exports = router;
