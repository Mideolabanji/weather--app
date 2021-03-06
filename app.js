function displayDefaultTemperature(response) {
  let defaultTemperatureIcon = document.querySelector("#temperature-icon");
  defaultTemperatureIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  defaultTemperatureIcon.setAttribute(
    "alt",
    response.data.weather[0].description
  );
  let defaultTemperature = document.querySelector("#city-temperature");
  defaultTemperature.innerHTML = Math.round(response.data.main.temp);
  let defaultWeatherDescription = document.querySelector(
    "#weather-description"
  );
  defaultWeatherDescription.innerHTML = response.data.weather[0].description;
  let defaultHumidity = document.querySelector("#humidity");
  let defaultHumidityPercentage = Math.round(response.data.main.humidity);
  defaultHumidity.innerHTML = `Humidity: ${defaultHumidityPercentage}%`;
  let defaultWind = document.querySelector("#wind");
  let defaultWindKM = Math.round(response.data.wind.speed);
  defaultWind.innerHTML = `Wind: ${defaultWindKM} km/h`;
  celciusTemperature = response.data.main.temp;

  forecastData(response.data.coord);
}
let defaultApiUrl =
  "https://api.openweathermap.org/data/2.5/weather?q=Lagos&appid=21c25c62efe8c3f5cd46c74303b5daaf&units=metric";
axios.get(defaultApiUrl).then(displayDefaultTemperature);

function forecastData(coordinate) {
  let defaultForecastAPIKey = `21c25c62efe8c3f5cd46c74303b5daaf`;
  let defaultForecastAPIUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinate.lat}&lon=${coordinate.lon}&appid=${defaultForecastAPIKey}&units=metric`;
  axios.get(defaultForecastAPIUrl).then(displayForecast);
}

function search(event) {
  event.preventDefault();
  let textInput = document.querySelector("#text-input");
  let h1 = document.querySelector("h1");
  if (textInput.value) {
    h1.innerHTML = `${textInput.value}`;
  } else {
    h1.innerHTML = null;
    alert("Please type a city");
  }

  let apiKey = "21c25c62efe8c3f5cd46c74303b5daaf";
  let city = `${textInput.value}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function displayTemperature(response) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;
  let temperatureIcon = document.querySelector("#temperature-icon");
  temperatureIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  temperatureIcon.setAttribute("alt", response.data.weather[0].description);
  let temperature = document.querySelector("#city-temperature");
  temperature.innerHTML = Math.round(response.data.main.temp);
  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = response.data.weather[0].description;
  let humidity = document.querySelector("#humidity");
  let humidityPercentage = Math.round(response.data.main.humidity);
  humidity.innerHTML = `Humidity: ${humidityPercentage}%`;
  let wind = document.querySelector("#wind");
  let windKM = Math.round(response.data.wind.speed);
  wind.innerHTML = `Wind: ${windKM} km/h`;

  celciusTemperature = response.data.main.temp;
  forecastData(response.data.coord);
}

function currentLocation(position) {
  let locationApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=21c25c62efe8c3f5cd46c74303b5daaf`;
  axios.get(locationApiUrl).then(displayTemperature);
}
function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocation);
}
let currentButton = document.querySelector("#current-btn");
currentButton.addEventListener("click", getPosition);

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  celciusLink.classList.remove("active-link");
  fahrenheitLink.classList.add("active-link");
  let fahrenheitTemperature = document.querySelector("#city-temperature");
  fahrenheitTemperature.innerHTML = Math.round(
    (celciusTemperature * 9) / 5 + 32
  );
}
let celciusTemperature = null;

function displayCelciusTemperature(event) {
  event.preventDefault();
  celciusLink.classList.add("active-link");
  fahrenheitLink.classList.remove("active-link");
  let celciusTemperatureElement = document.querySelector("#city-temperature");
  celciusTemperatureElement.innerHTML = Math.round(celciusTemperature);
}

function formatDay(dt) {
  let date = new Date(dt * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let forecastData = response.data.daily;
  forecastData.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2 forecast-data">
                <h5>${formatDay(forecastDay.dt)}</h5>
                  <img class="forecast-img"
                    src="https://openweathermap.org/img/wn/${
                      forecastDay.weather[0].icon
                    }@2x.png"
                    alt=""
                  />
                <div class="forecast-temp">
                <span id="maximum-forecast-temperature">${Math.round(
                  forecastDay.temp.max
                )}??</span>
                <span id="minimum-forecast-temperature">${Math.round(
                  forecastDay.temp.min
                )}??</span>
                </div>
              </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

function updateBackground() {
  let date = new Date();
  let hour = date.getHours();
  let body = document.querySelector("#app-container");
  let bstyle = body.style;

  if (hour >= 20) {
    bstyle.backgroundColor = "#726b68";
    bstyle.border = "1px solid #726b68";
  }

  if (hour <= 4) {
    bstyle.backgroundColor = "#726b68";
    bstyle.border = "1px solid #726b68";
  }
}
updateBackground();

let form = document.querySelector("form");
form.addEventListener("submit", search);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", displayCelciusTemperature);

let date = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[date.getDay()];
let hour = date.getHours();
let minutes = date.getMinutes();

if (hour < 10) {
  hour = `0${hour}`;
}
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let h6 = document.querySelector("h6");
h6.innerHTML = `Last updated: ${day} ${hour}:${minutes}`;
