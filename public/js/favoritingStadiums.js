// Document has to be ready
$(document).ready(function() {

  var $allStadiumList = $('#userFavs');
  var allStadiums = [];
  console.log('favoriting.js loaded!');
  // Moving list items
  function moveItems(origin, dest) {
    $(origin).find(':selected').appendTo(dest);
  };

  $('#left').click(function() {
    moveItems('#visitedStadiums', '#allStadiums');
    console.log($('select option:selected').text());
    console.log($('select option:selected').val());
    $.ajax({
      method: 'POST',
      url: '/userProfile/unvistedStadium',
      dataType: 'json',
      //dataType: 'json',
      data: {
        stadiumId: $('select option:selected').val()
      },
      success: handlePostSuccess,
      error: handlePostError
    });
    $("option:selected").removeAttr("selected");
  });

  $('#right').on('click', function() {
    moveItems('#allStadiums', '#visitedStadiums');
    console.log($('select option:selected').text());
    console.log($('select option:selected').val());
    $.ajax({
      method: 'POST',
      url: '/userProfile/vistedStadium',
      dataType: 'json',
      //dataType: 'json',
      data: {
        stadiumId: $('select option:selected').val()
      },
      success: handlePostSuccess,
      error: handlePostError
    });
    $("option:selected").removeAttr("selected");
  });

  // Getting all stadiums
  $.ajax({
    method: 'GET',
    url: '/api/stadiums',
    dataType: 'json',
    success: handleGetAllSuccess,
    error: handleGetAllError
  });

  // Getting all visited stadiums
  $.ajax({
    method: 'GET',
    url: '/userProfile/vistedStadium',
    dataType: 'json',
    success: handleGetUserSuccess,
    error: handleGetUserError
  });

});

// User vistedStadium
// ------------------------------------------------------------
function handleGetUserSuccess(data) {
  //console.log("getting all users success");
  //console.log(data);
  //console.log(data.stadiums);
  //console.log(data.stadiums[0]);
  //console.log(data[0]);
  $.each(data, function(index, item) {
    //console.log("index: " + index + ' id: ' + item.title);
    var stadiumHtml =
      "        <!-- one stadium -->" +
      "  <option>" + item.title + "</option>" +
      //    "  <option value= '" + item._id + "'>" + item.title + "</option>" +
      "        <!-- end one stadium -->";
    $('#visitedStadiums').append(stadiumHtml);
    //$('#userFavs').append(stadiumHtml);
  });
}

function handleGetUserError(data) {
  console.log('GET User stadiums error!!');
}

// Getting all stadiums
// ------------------------------------------------------------
function handleGetAllSuccess(data) {
  data.forEach(function(value) {
    renderStadium(value);
  });
}

function handleGetAllError(data) {
  console.log('GET ALL stadiums error!!');
}

// Posting a stadiums
// ------------------------------------------------------------
function handlePostSuccess(data) {
  console.log('YUP POSTED!!');
}

function handlePostError(data) {
  console.log('POST ERROR');
}

// this function takes a single stadium and renders it to the page
// ------------------------------------------------------------
function renderStadium(stadium) {
  var stadiumHtml =
    "        <!-- one stadium -->" +
    "  <option value= '" + stadium._id + "'>" + stadium.title + "</option>" +
    "        <!-- end one stadium -->";

  // render to the page with jQuery
  $('#allStadiums').append(stadiumHtml);
}
