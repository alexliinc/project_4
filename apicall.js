const request = require('request');
let restaurantArray = [];

function getRestaurants() {
  request("http://hp-api.herokuapp.com/api/characters", function(error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    //console.log('body:', body); // Print the response body
    var parsedData = JSON.parse(body);
    console.log(parsedData[0].name);
    console.log(parsedData[0].image);
  });
}
getRestaurants();
