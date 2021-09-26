// API Key 988c77a58d9ae4c18536f5b3fcc5e2b6

const cityBaseURL   = "https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial";
const apiKey        = "&appid=988c77a58d9ae4c18536f5b3fcc5e2b6";
let city;
const searchButton  = document.getElementById("search");
const cityInput     = document.getElementsByClassName("form-control");
const searchHistory = document.getElementById("search-history");

// fetch("https://api.openweathermap.org/data/2.5/weather?q=" 
//         + city + 
//         "&units=imperial&appid=988c77a58d9ae4c18536f5b3fcc5e2b6")
//     .then(response =>  response.json())
//     .then(data => console.log(data));

// Search button event listener
searchButton.addEventListener("click", function() {
    let searchHistoryButton = searchHistory.appendChild(document.createElement("button"));
    searchHistoryButton.setAttribute('type', 'button');
    searchHistoryButton.classList.add("btn");
    searchHistoryButton.classList.add("btn-secondary");
    searchHistoryButton.classList.add("w-100");
    searchHistoryButton.classList.add("mt-3");
    searchHistoryButton.setAttribute('id', cityInput[0].value);
    searchHistoryButton.innerText = cityInput[0].value;
}) 


