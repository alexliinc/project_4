var db = require('../models');

// GET /showAllPersons
function renderPerson(request, response) {
  response.render('Person.ejs');
  // db.Person.find({}, function(err, stadiums) {
  //   response.json(stadiums);
  // });
}

// GET /showAllPersons
function showAllPersons(request, response) {
  db.Person.find({}, function(err, Persons) {
    response.json(Persons);
  });
}

// POST /addNewPerson
function addNewPerson(request, response) {
  //console.log(request.body);
  db.Person.create({
    name: request.body.name,
    age: request.body.age
  }, function(err, Person) {
    console.log(Person);
    response.json(Person);
  });
}

// PUT /updatePerson
function updatePerson(request, response) {
  response.send("yeah");
}

// DELETE /removePerson
function removePerson(request, response) {
  console.log(request.params)
  var PersonId = request.params.id;

  db.Person.findOneAndRemove({
    _id: PersonId
  }, function(err, deletePerson) {
    response.json(deletePerson);
  });
}


module.exports = {
  renderPerson: renderPerson,
  addNewPerson: addNewPerson,
  updatePerson: updatePerson,
  removePerson: removePerson,
  showAllPersons: showAllPersons
}
