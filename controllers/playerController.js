var db = require('../models');

// GET /showAllPlayers
function renderPlayer(request, response) {
  response.render('player.ejs');
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
  console.log(request.params)
  var playerId = request.params.id;

  db.Player.findOneAndRemove({
    _id: playerId
  }, function(err, deletePlayer) {
    response.json(deletePlayer);
  });
}


module.exports = {
  renderPlayer: renderPlayer,
  addNewPlayer: addNewPlayer,
  updatePlayer: updatePlayer,
  removePlayer: removePlayer,
  showAllPlayers: showAllPlayers
}
