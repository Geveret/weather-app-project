//1
let currentTime = new Date();
//console.log(currentTime);
//console.log(currentTime.getDay());
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Tuesday",
  "Friday",
  "Saterday",
];
let day = days[currentTime.getDay()];
//alert(day);
let hour = currentTime.getHours();
//console.log(currentTime.getHours());
//alert(hour);
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = currentTime.getMinutes();
//console.log(minutes);
//alert(`${hour}:${minutes}`);
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let h1 = document.querySelector("#date-time");
h1.innerHTML = `${day} ${hour}:${minutes}`;

//2
function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let city = document.querySelector("#city-name");
  //city.innerHTML = cityInput.value;
  //city = cityInput.value;
  //console.log(`${cityInput.value}`);
  if (cityInput.value) {
    city.innerHTML = `${cityInput.value}`;
    citySearch(cityInput.value);
  } else {
    city.innerHTML = null;
    city.innerHTML = "Fell asleep waiting ...😴";
  }
}
function citySearch(city) {
  let apiKey = "367e66416cb88f1db74919878d0a90c3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  //console.log(apiUrl);
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);
citySearch("Tel-Aviv");
function showTemp(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let temperaturaElement = document.querySelector("#degrees");
  let description = document.querySelector("#weather-status");
  temperaturaElement.innerHTML = `${temperature}`;
  description.innerHTML = response.data.weather[0].description;
  let city = document.querySelector("#city-name");
  city.innerHTML = response.data.name;
  let wind = document.querySelector("#wind");
  wind.innerHTML = response.data.wind.speed;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let iconElement = document.querySelector("#sun-icon");
  let iconElementForcast = document.querySelector("#sun-s-icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  celsiusTemperature = response.data.main.temp;
}

// navagetion bar
let mainCities = document.querySelectorAll(".cities a");
mainCities.forEach(function (cityLink) {
  cityLink.addEventListener("click", navbarSearch);
});

function navbarSearch(event) {
  event.preventDefault();
  citySearch(event.target.innerHTML);
}

//user current location:
function showPosition(position) {
  console.log(position);
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  let coordinate = (position.coords.latitude, position.coords.longitude);
  console.log(coordinate);
  let apiKey = "367e66416cb88f1db74919878d0a90c3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`;
  console.log(apiUrl);
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let button = document.querySelector("#my-location");
button.addEventListener("click", getCurrentPosition);

//3
// function changeTempf(event) {
//   event.preventDefault();
//   temperatureF.innerHTML = "83";
// }
// let temperatureF = document.querySelector("#degrees");
// let unitF = document.querySelector("#unit-farenheit");
// unitF.addEventListener("click", changeTempf);

// function changeTempC(event) {
//   event.preventDefault();
//   temperatureC.innerHTML = "28";
// }
// let temperatureC = document.querySelector("#degrees");
// let unitC = document.querySelector("#unit-celsius");
// unitC.addEventListener("click", changeTempC);

//3 Temperature units conversion:

function changeTempf(event) {
  event.preventDefault();
  // remove active state  from unitC (celsius)
  unitC.classList.remove("active");
  // add active state  from unitF (fahrenheiT)
  unitF.classList.add("active");
  let temperatureElement = document.querySelector("#degrees");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  //alert(fahrenheiTemperature);
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}
function changeTempC(event) {
  event.preventDefault();
  // add active state  to unitC (celsius)
  unitC.classList.add("active");
  // remove active state  from unitF (fahrenheit)
  unitF.classList.remove("active");

  let temperatureElement = document.querySelector("#degrees");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let unitF = document.querySelector("#unit-fahrenheit");
unitF.addEventListener("click", changeTempf);

let unitC = document.querySelector("#unit-celsius");
unitC.addEventListener("click", changeTempC);
