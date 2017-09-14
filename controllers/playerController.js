var db = require('../models');

// GET /showAllPlayers
function renderPlayer(request, response) {
  var userPlayers = request.user.players;
  console.log(request.user.players);
  response.render('player.ejs', {
    userPlayers: userPlayers
  });
  // db.Player.find({}, function(err, stadiums) {
  //   response.json(stadiums);
  // });
}

// GET /showAllPlayers
function showAllPlayers(request, response) {
  db.Player.find({}, function(err, players) {
    response.json(players);
  });
}

// POST /addNewPlayer
function addNewPlayer(req, res) {
  //Allows user to save beer to db
  console.log("Backend save hit");
  console.log(req.body);
  var userPlayers = req.user.players;
  var newPlayer = new db.Player({
    name: req.body.name,
    image: req.body.image,
    action: req.body.action,
  });
  userPlayers.push(newPlayer);
  req.user.save();
  res.json(newPlayer);
}

// PUT /updatePlayer
function updatePlayer(request, response) {
  response.send("yeah");
}

// DELETE /removePlayer
function removePlayer(request, response) {

  console.log('Yo route is up');
  var id = request.params.id;
  console.log(id);
  var userId = request.user._id;
  console.log(userId);

  db.User.findOneAndUpdate({
      _id: userId
    }, {
      $pull: {
        players: {
          _id: id
        }
      }
    }, {
      upsert: true
    },
    function(err, user) {
      if (err) response.send(err);
      return response.redirect('../players');
    }
  );
}


module.exports = {
  renderPlayer: renderPlayer,
  addNewPlayer: addNewPlayer,
  updatePlayer: updatePlayer,
  removePlayer: removePlayer,
  showAllPlayers: showAllPlayers
}
