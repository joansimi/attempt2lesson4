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

function formatDay(timestamp){
  let date=new Date(timestamp * 1000);
  let days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thur",
    "Fri",
    "Sat"
  ];
  let day = days[date.getDay()];
  return(day)

}

function displayForecast(response){
  let forecast= response.data.daily;
  let forecastElement =document.querySelector("#weatherforecast")
  let forecastHTML=`<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index<6) {
         
    forecastHTML= forecastHTML +
    `<div class="col-2">
    <ul style="text-align: center;">
      <li style="color:#45171d" >
        ${formatDay(forecastDay.dt)}
      </li>
      <li>
      <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="icon" width="50">
      </li>
      <li>
        <span style="color:#e84a5f;">${forecastDay.temp.max}</span> <span style="color:#ff847c;">${forecastDay.temp.min}</span>
      </li>
    </ul>
  </div>`;
  
    }
  });
  forecastHTML= forecastHTML + `</div>`;
  forecastElement.innerHTML=forecastHTML;


}
function forecastExtract(coordinates){
 let apiKey="0aacb9bf31eaeb6f35035fe23576f7b2";
 let forecastUrl=`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${apiKey}`
 axios.get(forecastUrl).then(displayForecast)
}

function displayWeather(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector(".temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector(".humidity").innerHTML = response.data.main.humidity;
  document.querySelector(".wind").innerHTML = response.data.wind.speed;
  celsiustemperature=Math.round(
    response.data.main.temp);
    let iconelement=document.querySelector("#icon-image");
    iconelement.setAttribute("src", "https://openweathermap.org/img/wn/"+response.data.weather[0].icon+"@2x.png");
  forecastExtract(response.data.coord)
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

let celsiustemperature=null;

function converttofahrenheit(event){
  event.preventDefault();
  document.querySelector(".temp").innerHTML=Math.round((celsiustemperature * 9/5) + 32);
}

let fahrenheitElement= document.querySelector("#fahrenheit-link");
fahrenheitElement.addEventListener("click", converttofahrenheit);

function converttocelsius(event){
  event.preventDefault();
  document.querySelector(".temp").innerHTML=celsiustemperature;
}

let celsiusElement= document.querySelector("#celsius-link");
celsiusElement.addEventListener("click", converttocelsius);


