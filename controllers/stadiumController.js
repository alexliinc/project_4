var db = require('../models');

// GET /getAll Stadiums
function getAll(request, response) {
  db.Stadium.find({}, function(err, stadiums) {
    response.json(stadiums);
  });
}


module.exports = {
  getAll: getAll,
}
