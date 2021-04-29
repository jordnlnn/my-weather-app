//Time Display
function displayDateTime(now) {
  let date = new Date();
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = weekdays[date.getDay()];
  return `${day} ${hour}:${minute}`;
}
let dateElement = document.querySelector("#date-text");
let now = new Date();
dateElement.innerHTML = displayDateTime(now);

//my weather stats
let apiKey = "974867647183f192d10e0478c4341263";
let myCity = "Phoenix";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${myCity}&units=imperial`;

//forecast data
function getForecast(coordinates) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}
function showForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
function showMyData(response) {
  let temperature = Math.round(response.data.main.temp);
  let mainTemp = document.querySelector("#main-temp");
  mainTemp.innerHTML = `${temperature}`;

  farhenheitTemp = Math.round(response.data.main.temp);

  let description = response.data.weather[0].description;
  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = description;

  let humidity = response.data.main.humidity;
  let myHumidity = document.querySelector("#humidity");
  myHumidity.innerHTML = `Humidity: ${humidity}%`;

  let wind = Math.round(response.data.wind.speed);
  let myWind = document.querySelector("#wind");
  myWind.innerHTML = `Wind: ${wind}mph`;

  let myIcon = document.querySelector("img");
  myIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}
axios.get(`${apiUrl}&appid=${apiKey}`).then(showMyData);

let farhenheitTemp = null;

//search box form
function searchForCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-input").value;
  let apiKey = "974867647183f192d10e0478c4341263";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=${units}&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(displayWeatherData);
}

//display weather update
function displayWeatherData(response) {
  let updatedTemp = document.querySelector("#main-temp");
  let temperature = Math.round(response.data.main.temp);
  updatedTemp.innerHTML = `${temperature}`;

  farhenheitTemp = Math.round(response.data.main.temp);

  let searchedCity = document.querySelector("#city-text");
  let city = response.data.name;
  searchedCity.innerHTML = `${city.trim()}`;

  let description = response.data.weather[0].description;
  let updatedDescription = document.querySelector("#weather-description");
  updatedDescription.innerHTML = description;

  let humidity = response.data.main.humidity;
  let updatedHumidity = document.querySelector("#humidity");
  updatedHumidity.innerHTML = `Humidity: ${humidity}%`;

  let wind = Math.round(response.data.wind.speed);
  let updatedWind = document.querySelector("#wind");
  updatedWind.innerHTML = `Wind: ${wind}mph`;

  let updatedIcon = document.querySelector("img");
  updatedIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  let dateElement = document.querySelector("#date-text");
  dateElement.innerHTML = displayDateTime(now);

  getForecast(response.data.coord);
}
//search button submission
let submitCity = document.querySelector("#search-box-form");
submitCity.addEventListener("submit", searchForCity);

//unit conversion links
function showCelsiusTemp(event) {
  event.preventDefault();
  let celsiusTemp = (farhenheitTemp - 32) * (5 / 9);
  let temperature = document.querySelector("#main-temp");
  temperature.innerHTML = Math.round(celsiusTemp);
}
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

function showFarhenheitTemp(event) {
  event.preventDefault();
  let temperature = document.querySelector("#main-temp");
  temperature.innerHTML = farhenheitTemp;
}
let farhenheitLink = document.querySelector("#fahrenheit-link");
farhenheitLink.addEventListener("click", showFarhenheitTemp);

//forecast data
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        ` <div class="col-2 weather-box" id="forecast-box">
          <div class="forecast-day">${showForecastDay(forecastDay.dt)}</div>
          <img src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png" class="forecast-icons">
          <div class="forecast-temp">
            <span class="forecast-temp-max"><strong>${Math.round(
              forecastDay.temp.max
            )}°</strong></span>
            <span class="forecast-temp-min">${Math.round(
              forecastDay.temp.min
            )}°</span>
          </div>
        </div>
      `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
