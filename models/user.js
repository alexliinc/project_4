var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Player = require('./player.js');

var User = mongoose.Schema({
  local: {
    email: String,
    password: String,
  },
  players: [Player.schema] //HAS TO BE LOWER CASE!!!!
});

User.methods.hash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

User.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

// var User = mongoose.model('User', UserSchema);
// module.exports = User;
// Short hand
module.exports = mongoose.model('User', User);
