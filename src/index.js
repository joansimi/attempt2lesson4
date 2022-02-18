let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tueday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = 0 + hour;
}
let min = now.getMinutes();
if (min < 10) {
  min = 0 + min;
}
let time = hour + ":" + min;

let currenttime = document.querySelector(".current");

currenttime.innerHTML = day + " " + time;

let form = document.querySelector(".search-form");
form.addEventListener("submit", weatherExtract);

function displayWeather(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector(".temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector(".humidity").innerHTML = response.data.main.humidity;
  document.querySelector(".wind").innerHTML = response.data.wind.speed;
}

function weatherExtract(weather) {
  weather.preventDefault();
  let cityUrl = document.querySelector("#city-search");

  let apiKey = "0aacb9bf31eaeb6f35035fe23576f7b2";
  let weatherUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityUrl.value +
    "&units=metric&appid=" +
    apiKey;

  axios.get(weatherUrl).then(displayWeather);
}

function myWeather(location) {
  location.preventDefault();
  navigator.geolocation.getCurrentPosition(getposition);
}

function getposition(position) {
  let apiKey = "0aacb9bf31eaeb6f35035fe23576f7b2";
  let weatherUrl =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    position.coords.latitude +
    "&lon=" +
    position.coords.longitude +
    "&units=metric&appid=" +
    apiKey;

  axios.get(weatherUrl).then(displayWeather);
}

let currentWeather = document.querySelector("#current-location");
currentWeather.addEventListener("click", myWeather);
