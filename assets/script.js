// Variables for accessing openweather
// "https://api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}";
var APIkey = "10e92ba164bd768fc926ed1b3171b8e9";
var city;

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

    // Fetch API
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIkey;
    fetch(queryURL).then((response) => {
        return response.json()
    }).then((data) => {
        console.log(data)
    });

    // Save the city to local storage
    storeCity(cityValue);

    // Display the city in the search history
    var cityRecords = $("<div>").text(cityValue);
    searchHistoryEl.append(cityRecords);
    // Make each item in the search history a button
    cityRecords.addClass("btn-secondary");
    console.log(cityValue);
}

function storeCity(city) {
    // Retrieve existing cities from local storage
    var enteredCities = JSON.parse(localStorage.getItem("cities")) || [];

    // Add the new city to the array
    enteredCities.push(city);

    // Save the updated array back to local storage
    localStorage.setItem("cities", JSON.stringify(enteredCities));
}

function retrieveCities() {
    // Retrieve cities from local storage
    var storedCities = JSON.parse(localStorage.getItem("cities")) || [];

    // Display each city in the search history
    storedCities.forEach(function (city) {
        var cityRecords = $("<div>").text(city);
        // Make each item in the search history a button
        cityRecords.addClass("btn-secondary");
        searchHistoryEl.append(cityRecords);
    });
}

// FUNCTION FOR CURRENT WEATHER
// Event listener for save button click
cityFormEl.on("click", ".btn", displayCurrentWeather);

// Function to display 5 day forecast
function displayCurrentWeather(event) {
    event.preventDefault();

    // Get the city value
    var cityValue = cityInputEl.val().trim();

    // Update the 'city' variable based on user input
    city = cityValue;

    // Fetch API
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIkey;
    fetch(queryURL).then((response) => {
        return response.json()
    }).then((data) => {
        console.log(data);

        //Because the raw data provides info every 3 hours, iterate with i+8 to get a 24 hour cycle. Also start with i=1 to forecast starting tomorrow 
        var i = 0

        var location = data.city.name;
        var date = dayjs(data.list[i].dt_text).format("MMMM D");
        // var weatherIconEl = data.list[i].weather[0].icon;
        var temp = data.list[i].main.temp;
        var wind = data.list[i].wind.speed;
        var humidity = data.list[i].main.humidity;

        var locationEl = $("<div>").text(location);
        var dateEl = $("<div>").text(date);
        // var weatherIconEl = <img src="https://openweathermap.org/img/w/$" + icon + ".png" alt = "Icon" />;
        var tempEl = $("<div>").text("Temperature: " + Number.parseInt((temp - 273.15) * (9 / 5) + 32) + " °F");
        var windEl = $("<div>").text("Wind Speed: " + wind + " MPH");
        var humidityEl = $("<div>").text("Humidity: " + humidity + "%");

        var currentWeatherEl = $(".current-weather");
        var currentWeatherContainerEl = $("<div>");
        currentWeatherContainerEl.addClass("card")

        currentWeatherContainerEl.append(locationEl);
        currentWeatherContainerEl.append(dateEl);
        // currentWeatherContainerEl.append(weatherIconEl);
        currentWeatherContainerEl.append(tempEl);
        currentWeatherContainerEl.append(windEl);
        currentWeatherContainerEl.append(humidityEl);
        currentWeatherEl.append(currentWeatherContainerEl)
    })
}

// FUNCTION FOR 5 DAY FORECAST
// Event listener for save button click
cityFormEl.on("click", ".btn", displayFiveDayForecast);

// Function to display 5 day forecast
function displayFiveDayForecast(event) {
    event.preventDefault();

    // Get the city value
    var cityValue = cityInputEl.val().trim();

    // Update the 'city' variable based on user input
    city = cityValue;

    // Fetch API
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIkey;
    fetch(queryURL).then((response) => {
        return response.json()
    }).then((data) => {
        console.log(data);

        //Because the raw data provides info every 3 hours, iterate with i+8 to get a 24 hour cycle. Also start with i=1 to forecast starting tomorrow 
        for (var i = 1; i < data.list.length; i += 8) {

            var date = dayjs(data.list[i].dt_text).format("MMMM D");
            // var weatherIconEl = data.list[i].weather[0].icon;
            var temp = data.list[i].main.temp;
            var wind = data.list[i].wind.speed;
            var humidity = data.list[i].main.humidity;

            var dateEl = $("<div>").text(date);
            // var weatherIconEl = <img src="https://openweathermap.org/img/w/$" + icon + ".png" alt = "Icon" />;
            var tempEl = $("<div>").text("Temperature: " + Number.parseInt((temp - 273.15) * (9 / 5) + 32) + " °F");
            var windEl = $("<div>").text("Wind Speed: " + wind + " MPH");
            var humidityEl = $("<div>").text("Humidity: " + humidity + "%");

            var FiveDayEl = $(".five-day");
            var fiveDayContainerEl = $("<div>");
            fiveDayContainerEl.addClass("card")

            fiveDayContainerEl.append(dateEl);
            // fiveDayContainerEl.append(weatherIconEl);
            fiveDayContainerEl.append(tempEl);
            fiveDayContainerEl.append(windEl);
            fiveDayContainerEl.append(humidityEl);
            FiveDayEl.append(fiveDayContainerEl)
        }
    })
}