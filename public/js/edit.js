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

  function msg() {
    alert("Hello world!");
  }

  //$('#delete').click(deletePerson);
})
