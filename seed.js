var db = require('./models');

var Persons_list = [{
    name: "HP",
    action: "Love",
    image: "up.com"
  },
  {
    name: "RW",
    action: "KISS",
    image: "lol.com"
  }
];

// removing all Person
db.Person.remove({}, function(err, Person) {
  if (err) {
    console.log('Error is: ', err);
  } else {
    console.log('Removed All Person');
    // creating all new Persons
    db.Person.create(Persons_list, function(err, Persons) {
      if (err) {
        return console.log('err: ', err);
      } else {
        console.log("created", Persons.length, "Persons");
        process.exit();
      }
    });
  }
});
