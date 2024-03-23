// Function to display search history
function displaySearchHistory(searchHistory) {
    const searchHistoryContainer = document.getElementById('search-history');
    searchHistoryContainer.innerHTML = ''; // Clear previous search history

    searchHistory.forEach(city => {
        const cityElement = document.createElement('p');
        cityElement.textContent = city;
        searchHistoryContainer.appendChild(cityElement);
    });
}
// Function to display search history as buttons
function displaySearchHistoryButtons(searchHistory) {
    const searchHistoryContainer = document.getElementById('search-history');
    searchHistoryContainer.innerHTML = '';

    searchHistory.forEach(city => {
        const cityButton = document.createElement('button');
        cityButton.textContent = city;
        cityButton.classList.add('search-history-button'); // Add a class to the button
        cityButton.addEventListener('click', function() {
            // Trigger a new search for the city when the button is clicked
            document.getElementById('city-input').value = city;
            document.getElementById('search-form').dispatchEvent(new Event('submit'));
        });
        searchHistoryContainer.appendChild(cityButton);
    });
}

// Function to display forecast data
function displayForecast(data) {
    const forecastContainer = document.getElementById('forecast-container');
    forecastContainer.innerHTML = ''; // Clear current forecast information

    // Aggregate forecast data by day
    const forecastByDay = {};
    data.list.forEach(forecast => {
        const date = new Date(forecast.dt * 1000);
        const dateString = date.toLocaleDateString(); // Use this as the key
        if (!forecastByDay[dateString]) {
            forecastByDay[dateString] = [];
        }
        forecastByDay[dateString].push(forecast);
    });

    // Loop through the aggregated data and display each day's forecast data once
    Object.keys(forecastByDay).forEach(dateString => {
        const forecastsForDay = forecastByDay[dateString];
        const firstForecast = forecastsForDay[0];
        const temperature = firstForecast.main.temp;
        const humidity = firstForecast.main.humidity;
        const windSpeed = firstForecast.wind.speed;
        const weatherDescription = firstForecast.weather[0].description;
        const weatherIcon = firstForecast.weather[0].icon;
        const temperatureFahrenheit = ((temperature - 273.15) * 9/5 + 32).toFixed(2);

        // Create a div for each day's forecast
        const forecastDayElement = document.createElement('div');
        forecastDayElement.className = 'forecast-day';

        // Create HTML elements to display forecast data
        const dateElement = document.createElement('h3');
        dateElement.textContent = dateString;
        forecastDayElement.appendChild(dateElement);

        const temperatureElement = document.createElement('p');
        temperatureElement.textContent = `Temperature: ${temperatureFahrenheit}°F`;
        forecastDayElement.appendChild(temperatureElement);

        const humidityElement = document.createElement('p');
        humidityElement.textContent = `Humidity: ${humidity}%`;
        forecastDayElement.appendChild(humidityElement);

        const windSpeedElement = document.createElement('p');
        windSpeedElement.textContent = `Wind Speed: ${windSpeed} m/s`;
        forecastDayElement.appendChild(windSpeedElement);

        const weatherDescriptionElement = document.createElement('p');
        weatherDescriptionElement.textContent = `Weather: ${weatherDescription}`;
        forecastDayElement.appendChild(weatherDescriptionElement);

        const weatherIconElement = document.createElement('img');
        weatherIconElement.src = `http://openweathermap.org/img/wn/${weatherIcon}.png`;
        weatherIconElement.alt = weatherDescription;
        forecastDayElement.appendChild(weatherIconElement);

        forecastContainer.appendChild(forecastDayElement);
    });
}

// Event listener for form submission
document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const city = document.getElementById('city-input').value;
    const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

    // API call for current weather data
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=26618f1041e598e2f43e9c6d97848dcf`)
    .then(response => response.json())
    .then(data => {
        // You can display the current weather data here if needed
        console.log("Current weather data:", data);

        // Store searched city in local storage and update search history
        if (!searchHistory.includes(city)) {
            searchHistory.push(city);
            localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
        }
        // Display updated search history as buttons
        displaySearchHistoryButtons(searchHistory);
    })
    .catch(error => console.log(error));

    // API call for 5-day forecast data
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=26618f1041e598e2f43e9c6d97848dcf`)
    .then(response => response.json())
    .then(data => {
        displayForecast(data);
    })
    .catch(error => console.log(error));
});

// Display search history on page load
document.addEventListener('DOMContentLoaded', function() {
    const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    displaySearchHistory(searchHistory);
    displaySearchHistoryButtons(searchHistory);
});
