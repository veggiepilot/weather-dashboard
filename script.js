// API Key 988c77a58d9ae4c18536f5b3fcc5e2b6

const cityBaseURL   = "https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial";
const apiKey        = "&appid=988c77a58d9ae4c18536f5b3fcc5e2b6";
const searchButton  = document.getElementById("search");
const cityInput     = document.getElementsByClassName("form-control");
const searchHistory = document.getElementById("search-history");
const currentCityWeather = document.getElementsByClassName("current-city-weather");
let city;
const date = moment().format("MM/DD/YYYY");

// Search button event listener
searchButton.addEventListener("click", function() {
    city = cityInput[0].value.trim();
    let searchHistoryButton = searchHistory.appendChild(document.createElement("button"));
    searchHistoryButton.setAttribute('id', city);
    searchHistoryButton.classList.add("btn");
    searchHistoryButton.classList.add("btn-secondary");
    searchHistoryButton.classList.add("w-100");
    searchHistoryButton.classList.add("mt-3");
    searchHistoryButton.setAttribute('id', city);
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

    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + apiKey)
    .then(response =>  response.json())
    .then(uviData => renderCurrentCityWeather(data, uviData));
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
    uvIndex.innerText = `UV index: ${uviData.current.uvi}`;
}




