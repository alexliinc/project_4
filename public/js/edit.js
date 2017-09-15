$(document).ready(function() {


});


$(document).ready(function() {
  console.log("edit js connected");

  function deletePerson() {
    console.log("frontend hit with DELETE");
    console.log($('#delete').data('userid'));

    // $.ajax({
    //   type: "DELETE",
    //   url: "/players/",
    //   dataType: 'json',
    // });
  };




  //$('#delete').click(deletePerson);
})

function msg(item, action) {
  console.log(item);
  console.log(action);
  $.ajax({
    method: "PUT",
    url: "/players/" + item,
    data: {
      id: item,
      action: action
    },
    success: function(result) {
      console.log("it worked");
    }
  });
}
