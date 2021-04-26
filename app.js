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

//current temp display
let apiKey = "974867647183f192d10e0478c4341263";
let apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?q=Phoenix&units=imperial";

function showMyTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let mainTemp = document.querySelector("#main-temp");
  mainTemp.innerHTML = `${temperature}°F`;
}
axios.get(`${apiUrl}&appid=${apiKey}`).then(showMyTemperature);

//my weather description
let descriptionURL =
  "https://api.openweathermap.org/data/2.5/weather?q=Phoenix&units=imperial&appid=974867647183f192d10e0478c4341263";
function showDescription(response) {
  let description = response.data.weather[0].main;
  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = description;
}
axios.get(descriptionURL).then(showDescription);

//search box form
function searchForCity(event) {
  event.preventDefault();
  let input = document.querySelector("#search-input").value;
  let apiKey = "974867647183f192d10e0478c4341263";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=${units}&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(displayWeatherData);
}
//display weather update
function displayWeatherData(response) {
  let searchedCity = document.querySelector("#city-text");
  let currentTemp = document.querySelector("#main-temp");
  let temperature = Math.round(response.data.main.temp);
  currentTemp.innerHTML = `${temperature}°F`;
  let city = response.data.name;
  searchedCity.innerHTML = `${city.trim()}`;
  let dateElement = document.querySelector("#date-text");
  dateElement.innerHTML = displayDateTime(response.data.dt * 1000);
}
//search button submission
let submitCity = document.querySelector("#search-box-form");
submitCity.addEventListener("submit", searchForCity);
