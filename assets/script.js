const apiKey = '26618f1041e598e2f43e9c6d97848dcf';
const baseURL = 'https://api.openweathermap.org/data/2.5/'

function getWeather(city) {
    fetch('${baseURL}weather?q=${city}&appid=${apiKey}')
    .then(response) => response.json())
    .then(data => displayCurrentWeather(data))
    .catch(error => console.error('Error fetching weather:', error));
}

function getForecast(city) {
fetch(`${baseUrl}forecast?q=${city}&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => displayForecast(data))
    .catch(error => console.error('Error fetching forecast:', error));
}
function displayCurrentWeather(data) {
    // Display current weather information
}

function displayForecast(data) {
    // Display 5-day forecast
}
document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const city = document.getElementById('city-input').value;
    getWeather(city);
    getForecast(city);
    // Add city to search history
    addToSearchHistory(city);
});
function addToSearchHistory(city) {
    let history = JSON.parse(localStorage.getItem('searchHistory')) || [];
    if (!history.includes(city)) {
        history.push(city);
        localStorage.setItem('searchHistory', JSON.stringify(history));
        displaySearchHistory();
    }
}

function displaySearchHistory() {
    const history = JSON.parse(localStorage.getItem('searchHistory')) || [];
    const historyContainer = document.getElementById('search-history');
    historyContainer.innerHTML = '';
    history.forEach(city => {
        const cityElement = document.createElement('button');
        cityElement.textContent = city;
        cityElement.onclick = function() {
            getWeather(city);
            getForecast(city);
        };
        historyContainer.appendChild(cityElement);
    });
}

// Display search history on page load
displaySearchHistory();
