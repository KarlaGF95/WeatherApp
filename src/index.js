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

document.querySelector("h3").innerHTML = `${currentFullDate} @ ${currentTime}`;

function updateWeather(response) {
  document.querySelector("h1").innerHTML = `${response.data.city}`;
  document.querySelector("h2").innerHTML = `${response.data.country}`;
  let currentTemperatureElement = document.querySelector("#current-degrees");
  currentTemperatureElement.innerHTML = Math.round(
    response.data.temperature.current
  );
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = `${response.data.condition.description}`;
  let windElement = document.querySelector("#wind");
  let wind = Math.round(response.data.wind.speed);
  windElement.innerHTML = `Wind: ${wind}km/h`;
  let humidityElement = document.querySelector("#humidity");
  let humidity = Math.round(response.data.temperature.humidity);
  humidityElement.innerHTML = `Humidity: ${humidity}%`;
}

function searchCity(event) {
  event.preventDefault();
  let apiKey = "8a791e3ct3b2f517a9ob0f0038efb4fd";
  let units = "metric";
  let city = document.querySelector("#citySearch");
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city.value}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(updateWeather);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);
