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

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = ["13/02", "14/02", "15/02", "16/02", "17/02", "18/02"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2 text-center">
          <span class="date">${day}</span>
          <div class="card mx-auto" style="width: 5rem; height: 6rem">
            <p class="weather-icon">
              <i class="fa-solid fa-sun"></i>
            </p>
            <p class="temperature">
              <span class="maxTemperature"> 13&deg; </span
              ><span class="minTemperature">/ 3&deg;</span>
            </p>
          </div>
        </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
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

  celsiusTemperature = response.data.temperature.current;
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

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#current-degrees");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  celsiuslink.classList.remove("active");
  fahrenheitlink.classList.add("active");
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiuslink.classList.add("active");
  fahrenheitlink.classList.remove("active");
  let temperatureElement = document.querySelector("#current-degrees");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitlink = document.querySelector("#fahrenheit-link");
fahrenheitlink.addEventListener("click", displayFahrenheitTemperature);

let celsiuslink = document.querySelector("#celsius-link");
celsiuslink.addEventListener("click", displayCelsiusTemperature);

search("Amsterdam");
displayForecast();
