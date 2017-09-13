var mongoose = require("mongoose");
var Schema = mongoose.Schema;


//models/player.js
var PlayerSchema = new Schema({
  name: String,
  image: String,
  action: String,
});

var Player = mongoose.model('Player', PlayerSchema);

module.exports = Player;
