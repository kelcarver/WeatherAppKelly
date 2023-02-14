//Customise Page//
let firstName = prompt("Hey 👋 What is your first name?");
console.log(firstName);

let h1 = document.querySelector("div#greetings");
h1.innerHTML = `👋 Hello, ${firstName}! 👋`;

if (firstName === "") {
  h1.innerHTML = `👋 Hello, Stranger!👋`;
}
console.log(h1);

//Log Date and Time//
let fullCurrentDate = new Date();
console.log(fullCurrentDate);

function displayedDate(Date) {
  let dayIndex = fullCurrentDate.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[dayIndex];

  let monthIndex = fullCurrentDate.getMonth();
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];

  let month = months[monthIndex];
  let year = fullCurrentDate.getFullYear();
  let dateNow = fullCurrentDate.getDate();

  return `📅 ${day}, ${month}.${dateNow} ${year}`;
}

let userDate = document.querySelector("div#current-date");
userDate.innerHTML = displayedDate("div#current-date");
console.log(userDate);

function displayedTime(Date) {
  let hours = fullCurrentDate.getHours();
  let minutes = fullCurrentDate.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `⌚ Local Time ${hours}:${minutes}`;
}

let userTime = document.querySelector("div#current-time");
userTime.innerHTML = displayedTime("div#current-time");

// API Response to Webpage//

function showWeather(response) {
  console.log(response.data);
  document.getElementById(
    "#location-switch"
  ).innerHTML = `${response.data.name}`;
  document.querySelector("#current-temperature").innerHTML = `🌡️ 
  ${Math.round(response.data.main.temp)} °C`;
  document.querySelector(
    "#weather-main"
  ).innerHTML = `${response.data.weather[0].main}!`;
}

//Search City Function on Webpage//

function searchCity(city) {
  let apiKey = "cb286bad3607984b41ed10c8de5cf00e";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

//Search for current position//

function searchLocation(position) {
  let apiKey = "cb286bad3607984b41ed10c8de5cf00e";
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

//Search actions on Webpage//

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
console.log(form);

let currentLocationLink = document.getElementById("#location-switch");
currentLocationLink.addEventListener("click", getCurrentLocation);
console.log(currentLocationLink);
