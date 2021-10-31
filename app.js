function displayTemperature(response) {
  let defaultTemperatureIcon = document.querySelector("#temperature-icon");
  defaultTemperatureIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
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
}
let defaultApiUrl =
  "https://api.openweathermap.org/data/2.5/weather?q=Lagos&appid=21c25c62efe8c3f5cd46c74303b5daaf&units=metric";
axios.get(defaultApiUrl).then(displayTemperature);

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

  function displayTemperature(response) {
    let temperatureIcon = document.querySelector("#temperature-icon");
    temperatureIcon.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
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
  }
  let apiKey = "21c25c62efe8c3f5cd46c74303b5daaf";
  let city = `${textInput.value}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

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

let form = document.querySelector("form");
form.addEventListener("submit", search);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

function displayCelciusTemperature(event) {
  event.preventDefault();
  celciusLink.classList.add("active-link");
  fahrenheitLink.classList.remove("active-link");
  let celciusTemperatureElement = document.querySelector("#city-temperature");
  celciusTemperatureElement.innerHTML = Math.round(celciusTemperature);
}
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

let h5 = document.querySelector("h5");
h5.innerHTML = `${day}, ${hour}:${minutes}`;

let lastUpdatedTime = document.querySelector("#last-updated-time");
lastUpdatedTime.innerHTML = `Last updated on ${day}, ${hour}:${minutes}`;
