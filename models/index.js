//INDEX for database

var mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI ||
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  "mongodb://localhost/hp");


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/hp");

module.exports.User = require("./user.js");
module.exports.Player = require("./player.js");
