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

function showMyData(response) {
  let temperature = Math.round(response.data.main.temp);
  let mainTemp = document.querySelector("#main-temp");
  mainTemp.innerHTML = `${temperature}°F`;

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
}
console.log(`${apiUrl}&appid=${apiKey}`);
axios.get(`${apiUrl}&appid=${apiKey}`).then(showMyData);

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
  updatedTemp.innerHTML = `${temperature}°F`;

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
}
//search button submission
let submitCity = document.querySelector("#search-box-form");
submitCity.addEventListener("submit", searchForCity);
