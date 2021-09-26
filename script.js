// API Key 988c77a58d9ae4c18536f5b3fcc5e2b6

const cityBaseURL   = "https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial";
const apiKey        = "&appid=988c77a58d9ae4c18536f5b3fcc5e2b6";
let city;
const searchButton  = document.getElementById("search");
const cityInput     = document.getElementsByClassName("form-control");
const searchHistory = document.getElementById("search-history");
console.log(cityInput[0].value);

// fetch("https://api.openweathermap.org/data/2.5/weather?q=" 
//         + city + 
//         "&units=imperial&appid=988c77a58d9ae4c18536f5b3fcc5e2b6")
//     .then(response =>  response.json())
//     .then(data => console.log(data));

// Search button event listener
searchButton.addEventListener("click", function() {
    console.log(searchHistory);
}) 


