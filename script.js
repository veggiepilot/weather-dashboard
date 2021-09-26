// API Key 988c77a58d9ae4c18536f5b3fcc5e2b6

const cityBaseURL        = "https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial";
const apiKey             = "&appid=988c77a58d9ae4c18536f5b3fcc5e2b6";
const searchButton       = document.getElementById("search");
const cityInput          = document.getElementsByClassName("form-control");
const searchHistory      = document.getElementById("search-history");
const currentCityWeather = document.getElementsByClassName("current-city-weather");
let city;
const date               = moment().format("MM/DD/YYYY");
const cardRow            = document.getElementsByClassName("row")[1];

// Search button event listener
searchButton.addEventListener("click", function() {
    city = cityInput[0].value.trim();
    let searchHistoryButton = searchHistory.appendChild(document.createElement("button"));
    searchHistoryButton.setAttribute('id', city);
    searchHistoryButton.classList.add("btn");
    searchHistoryButton.classList.add("btn-secondary");
    searchHistoryButton.classList.add("w-100");
    searchHistoryButton.classList.add("mt-3");
    searchHistoryButton.innerText = city;
    fetchCityWeather();
}) 

// API Call for city weather
function fetchCityWeather() {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" 
        + city + 
        "&units=imperial&appid=988c77a58d9ae4c18536f5b3fcc5e2b6")
    .then(response =>  response.json())
    .then(function (data) {
        fetchUVIData(data)
    });
}

// API Call for UV index Data
function fetchUVIData(data) {
    const lat = data.coord.lat;
    const lon = data.coord.lon;

    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial" + apiKey)
    .then(response =>  response.json())
    .then(function (uviData){
        renderCurrentCityWeather(data, uviData); 
        renderFiveDayForecast(uviData);
    });
}

function renderCurrentCityWeather(data, uviData) {

    let iconSource = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;

    let iconImg = document.createElement("img");
    iconImg.setAttribute("src", iconSource);

    let h4 = document.createElement("h4");
    currentCityWeather[0].appendChild(h4);
    h4.innerText = `${city} (${date})`;
    h4.appendChild(iconImg);

    let temp = document.createElement("p");
    currentCityWeather[0].appendChild(temp);
    temp.innerText = `Temp: ${data.main.temp} \xB0F`;

    let wind = document.createElement("p");
    currentCityWeather[0].appendChild(wind);
    wind.innerText = `Wind: ${data.wind.speed} MPH`;

    let humidity = document.createElement("p");
    currentCityWeather[0].appendChild(humidity);
    humidity.innerText = `Humidity: ${data.main.humidity} %`;

    let uvIndex = document.createElement("p");
    currentCityWeather[0].appendChild(uvIndex);
    uvIndex.innerText = "UV index: ";
    let span = document.createElement("span");
    uvIndex.appendChild(span);
    span.classList.add('badge');
    span.classList.add(uviInfoRender(uviData));
    span.innerText = uviData.current.uvi;
}

function uviInfoRender(uviData) {
    let badgeClass = 'bg-success';
    let currentUVIndex = uviData.current.uvi;
    if(currentUVIndex > 2.00 &&  currentUVIndex < 2.99) {
        badgeClass =  'bg-warning';
    } else if (currentUVIndex > 3.00) {
        badgeClass = 'bg-danger';
    }
    return badgeClass;
}

function renderFiveDayForecast(uviData) {

    let forecastDays = uviData.daily;
    
    for (let i = 1; i <= 5; i++) {
       const unix = forecastDays[i].dt;
       const date = new Date(unix * 1000);
       const month = date.getUTCMonth() + 1;
       const dayDisplay = date.getUTCDate();
       const year = date.getUTCFullYear();
       const fullDate = `${month}/${dayDisplay}/${year}`

       let generateFiveDay = 
       `
       <div class="col" >
           <div class="card h-100 bg-primary bg-gradient text-white">
           <div class="card-body">
               <h5 class="card-title">${fullDate}</h5>
               <img src="http://openweathermap.org/img/w/${forecastDays[i].weather[0].icon}.png" alt="icon of current weather">
               <p class="card-text">Temp: ${forecastDays[i].temp.day} \xB0F</p>
               <p class="card-text">Wind: ${forecastDays[i].wind_speed} MPH</p>
               <p class="card-text">Humidity: ${forecastDays[i].humidity} %</p>
           </div>
           </div>
       </div>
       
       `;

       cardRow.innerHTML += generateFiveDay;

    }
}


