var mongoose = require("mongoose");
var Schema = mongoose.Schema;


//models/person.js
var PersonSchema = new Schema({
  name: String,
  action: String,
  image: String
});

var Person = mongoose.model('Person', PersonSchema);

module.exports = Person;
