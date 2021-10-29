function displayTemperature(response) {
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
}
let tempCApiUrl =
  "https://api.openweathermap.org/data/2.5/weather?q=Lagos&appid=21c25c62efe8c3f5cd46c74303b5daaf&units=metric";
axios.get(tempCApiUrl).then(displayTemperature);

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
  }
  let apiKey = "21c25c62efe8c3f5cd46c74303b5daaf";
  let city = `${textInput.value}`;
  let apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

let form = document.querySelector("form");
form.addEventListener("submit", search);

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

let firstPrediction = document.querySelector("#first-prediction");
firstPrediction.innerHTML = days[date.getDay() + 1];

let h5 = document.querySelector("h5");
h5.innerHTML = `${day}, ${hour}:${minutes}`;

let lastUpdatedTime = document.querySelector("#last-updated-time");
lastUpdatedTime.innerHTML = `Last updated on ${day}, ${hour}:${minutes}`;
