// Document has to be ready
$(document).ready(function() {
  console.log('app.js loaded!');
  const apiUrl = 'http://hp-api.herokuapp.com/api/characters';
  // Getting all characters
  $.ajax({
    method: 'GET',
    url: 'http://hp-api.herokuapp.com/api/characters',
    dataType: 'json',
    success: handleGetAllSuccess,
    error: handleGetAllError
  });


});



var i = 0;

function buttonClick() {
  if (i > 25) {
    i = 0;
  }
  i++;
  document.getElementById('inc').value = i;
  console.log(i);
  console.log($('select option:selected').val());
}

// Getting all characters
// ------------------------------------------------------------
function handleGetAllSuccess(data) {
  // data.forEach(function(value) {
  //   renderCharacter(value);
  // });
  //console.log(data[0]);
  renderCharacter(data[0])
  selectPerson = data[0];
  console.log(selectPerson);
  const savePerson = function() {
    console.log("frontend hit with save");
    var action = $('select option:selected').val();
    $.ajax({
      type: "POST",
      url: "/players",
      dataType: 'json',
      data: {
        name: selectPerson.name,
        image: selectPerson.image,
        action: action,
      }
    });
  };

  // $('button').on('click', saveBeer);
  $('#submit').click(savePerson);
}

function handleGetAllError(data) {
  console.log('GET ALL characters error!!');
}


// this function takes a single character and renders it to the page
// ------------------------------------------------------------
function renderCharacter(character) {
  var charactersHTML =
    "        <!-- one character -->" +
    "<div>" +
    "  <option value= '" + character.name + "'>" + character.name + "</option>" +
    "<img src=" + character.image + ">"
  "</div>" +
  "        <!-- end one character -->";


  // render to the page with jQuery
  $('#characters').append(charactersHTML);
}
