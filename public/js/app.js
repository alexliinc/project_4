// Document has to be ready
$(document).ready(function() {
  console.log('app.js loaded!');

  // Getting all characters
  // $.ajax({
  //   method: 'GET',
  //   url: 'http://hp-api.herokuapp.com/api/characters',
  //   dataType: 'json',
  //   success: handleGetAllSuccess,
  //   error: handleGetAllError
  // });

  $('#submit').click(function() {
    console.log($('#action').val());
  });

});


// Getting all characters
// ------------------------------------------------------------
function handleGetAllSuccess(data) {
  data.forEach(function(value) {
    renderCharacter(value);
  });
}

function handleGetAllError(data) {
  console.log('GET ALL stadiums error!!');
}


// this function takes a single stadium and renders it to the page
// ------------------------------------------------------------
function renderCharacter(character) {
  var charactersHTML =
    "        <!-- one stadium -->" +
    "  <option value= '" + character._id + "'>" + character.name + "</option>" +
    "        <!-- end one stadium -->";

  // render to the page with jQuery
  $('#characters').append(charactersHTML);
}
