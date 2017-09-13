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
function addNewPlayer(request, response) {
  //console.log(request.body);
  db.Player.create({
    name: request.body.name,
    age: request.body.age
  }, function(err, player) {
    console.log(player);
    response.json(player);
  });
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
