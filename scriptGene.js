// Setting user input State into local storage (when user clicks submit on page 1) and moving to page 2
// HTML page 1
$("#submitBtn").on("click", function (event) {
  event.preventDefault();
  location.href = "index2.html";
  $("#state").each(function () {
    var id = $(this).attr("id");
    var value = $(this).val();
    localStorage.setItem(id, value);
  });
});

// Pulling user input State from local storage and calling AJAX object array for that state (for use on page 2)
// HTML page 2
var state = localStorage.getItem("state");
var parkName = "";
var queryUrl =
  "https://developer.nps.gov/api/v1/parks?stateCode=" +
  state +
  "&api_key=f752B00Hli3S9ed2PsgaxTti5XBmaUL70IP4ZcTu";
$.ajax({
  url: queryUrl,
  method: "GET",
}).then(function (response) {
  parkName = response.data[1].fullName;
  parkImg = response.data[1].images[0].url;
  desc = response.data[1].description;
  lat = response.data[1].latitude;
  long = response.data[1].longitude;

  $(".title").text(parkName);
  $(".imgDiv").attr("src", parkImg);
  $(".description").text(desc);
  $(".latLon").text("Latitude: " + lat + " Longitude: " + long);
});

// Pulling user input from local storage and calling AJAX object array for that state (for use on page 3)
// HTML page 3
var state = localStorage.getItem("state");
var parkName = "";
var queryUrl =
  "https://developer.nps.gov/api/v1/parks?stateCode=" +
  state +
  "&api_key=f752B00Hli3S9ed2PsgaxTti5XBmaUL70IP4ZcTu";
$.ajax({
  url: queryUrl,
  method: "GET",
}).then(function (response) {
  parkName = response.data[2].fullName;
  weatherInfo = response.data[2].weatherInfo;
  lat = response.data[2].latitude;
  long = response.data[2].longitude;
  console.log(response);
  $(".title2").text(parkName);
  $(".weatherInfo").text(weatherInfo);
  $(".latLon2").text("Latitude: " + lat + " Longitude: " + long);
});

// Materialize Carousel
// HTML 3
$(document).ready(function () {
  // get image info and append new carousel item for each
  $.ajax({
    url: queryUrl,
    method: "GET",
  }).then(function (response) {
    images = response.data[3].images;
    console.log(images);
    var i = 0;
    $(images).each(function () {
      url = images[i].url;
      console.log(url);
      var newItem = $("<a>").addClass("carousel-item");
      var newImg = $("<img>").attr("src", url);
      var newSlide = newItem.append(newImg);
      $(".carousel").append(newSlide);
      i++;
    });
    // initialize the carousel
    $(".carousel").carousel();
  });
});
