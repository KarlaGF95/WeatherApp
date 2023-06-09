let now = new Date();

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

let months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];

let dayNumbers = [
  "00",
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
];

let minuteNumbers = [
  "00",
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
  "32",
  "33",
  "34",
  "35",
  "36",
  "37",
  "38",
  "39",
  "40",
  "41",
  "42",
  "43",
  "44",
  "45",
  "46",
  "47",
  "48",
  "49",
  "50",
  "51",
  "52",
  "53",
  "54",
  "55",
  "56",
  "57",
  "58",
  "59",
  "60",
];

let currentDay = days[now.getDay()];
let currentDate = dayNumbers[now.getDate()];
let currentMonth = months[now.getMonth()];
let currentHours = now.getHours();
let currentMinutes = minuteNumbers[now.getMinutes()];

let currentFullDate = `${currentDay} ${currentDate}/${currentMonth}`;
let currentTime = `${currentHours}:${currentMinutes}`;

document.querySelector(
  "h3"
).innerHTML = `Last update: ${currentFullDate} @ ${currentTime}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2 text-center">
          <span class="date">${formatDay(forecastDay.time)}</span>
          <div class="card mx-auto" style="width: 5rem; height: 7rem">
            <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
              forecastDay.condition.icon
            }.png" alt="weather icon" />
            <p class="temperature">
              <span class="maxTemperature"> ${Math.round(
                forecastDay.temperature.maximum
              )}&deg; </span
              ><span class="minTemperature">/ ${Math.round(
                forecastDay.temperature.minimum
              )}&deg;</span>
            </p>
          </div>
        </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "8a791e3ct3b2f517a9ob0f0038efb4fd";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function updateWeather(response) {
  document.querySelector("h1").innerHTML = `${response.data.city}`;
  document.querySelector("h2").innerHTML = `${response.data.country}`;
  let temperatureElement = document.querySelector("#current-degrees");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = `${response.data.condition.description}`;
  let windElement = document.querySelector("#wind");
  let wind = Math.round(response.data.wind.speed);
  windElement.innerHTML = `Wind: ${wind}km/h`;
  let humidityElement = document.querySelector("#humidity");
  let humidity = Math.round(response.data.temperature.humidity);
  humidityElement.innerHTML = `Humidity: ${humidity}%`;
  let iconElement = document.querySelector("#weathericon");
  iconElement.setAttribute("src", response.data.condition.icon_url);

  getForecast(response.data.coordinates);
}

function search(city) {
  let apiKey = "8a791e3ct3b2f517a9ob0f0038efb4fd";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("Amsterdam");
displayForecast();
