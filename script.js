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

// display forecast:
function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");

  let days = ["Wed", "Thu", "Fri", "Sat", "Sun"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      ` 
                <div class="col-2">
                  <div class="weather-forecast-date">${day}</div>
                  <img
                    src="http://openweathermap.org/img/wn/04n@2x.png"
                    alt="broken clouds"
                    width="50"
                  />
                  <div class="weather-forecast-temperature">
                    <span class="weather-forecast-temperature-max"> 18º </span>
                    <span class="weather-forecast-temperature-min"> 12º </span>
                  </div>
                </div>
              `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  // console.log(forecastHTML);
}

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

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "367e66416cb88f1db74919878d0a90c3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

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

  getForecast(response.data.coord);
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

//Show/hide main nav-bar

function showstarCity(click) {
  let star = document.getElementById("nav-bar");
  if (star.style.display === "none") {
    star.style.display = "block";
  } else {
    star.style.display = "none";
  }
}
let star = document.querySelector("#star-cities");
star.addEventListener("click", showstarCity);
