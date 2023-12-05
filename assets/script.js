// Variables for accessing openweather
// "api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}";
var APIkey = "10e92ba164bd768fc926ed1b3171b8e9";
var city;
var queryURL = "api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIkey;

// Variables for HTML items
var cityFormEl = $("#city-form");
var cityInputEl = $("#city-input");
var searchHistoryEl = $(".search-history");

// Load cities from local storage on page load
$(document).ready(function () {
    retrieveCities();
});

// Event listener for save button click
cityFormEl.on("click", ".btn", displayCity);

function displayCity(event) {
    event.preventDefault();

    // Get the city value
    var cityValue = cityInputEl.val().trim();

    // Update the 'city' variable based on user input
    city = cityValue;

    // Save the city to local storage
    storeCity(cityValue);

    // Display the city in the search history
    var cityRecords = $("<div>").text(cityValue);
    searchHistoryEl.append(cityRecords);

    console.log(cityValue);
}

function storeCity(city) {
    // Retrieve existing cities from local storage
    var existingCities = JSON.parse(localStorage.getItem("cities")) || [];

    // Add the new city to the array
    existingCities.push(city);

    // Save the updated array back to local storage
    localStorage.setItem("cities", JSON.stringify(existingCities));
}

function retrieveCities() {
    // Retrieve cities from local storage
    var storedCities = JSON.parse(localStorage.getItem("cities")) || [];

    // Display each city in the search history
    storedCities.forEach(function (city) {
        var cityRecords = $("<div>").text(city);
        searchHistoryEl.append(cityRecords);
    });
}
