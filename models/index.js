//INDEX for database

var mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI ||
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  "mongodb://localhost/hp_KMK");


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/hp_KMK");

module.exports.Person = require("./Person.js");
