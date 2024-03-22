// Function to display current weather data
function displayCurrentWeather(data) {
    const currentWeatherContainer = document.getElementById('current-weather-container');

    // Extract necessary information from the API response
    const cityName = data.name;
    const date = new Date(data.dt * 1000);
    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const weatherDescription = data.weather[0].description;
    const weatherIcon = data.weather[0].icon;
    // Convert temperature from Kelvin to Fahrenheit
    const temperatureFahrenheit = ((temperature - 273.15) * 9/5 + 32).toFixed(2);

    // Clear previous weather information before displaying new data
    currentWeatherContainer.innerHTML = '';

    // Create HTML elements to display current weather data
    const cityElement = document.createElement('h2');
    cityElement.textContent = cityName;
    currentWeatherContainer.appendChild(cityElement);

    const dateElement = document.createElement('p');
    dateElement.textContent = date.toLocaleDateString();
    currentWeatherContainer.appendChild(dateElement);

    const temperatureElement = document.createElement('p');
    temperatureElement.textContent = `Temperature: ${temperatureFahrenheit}°F`;
    currentWeatherContainer.appendChild(temperatureElement);

    const humidityElement = document.createElement('p');
    humidityElement.textContent = `Humidity: ${humidity}%`;
    currentWeatherContainer.appendChild(humidityElement);

    const windSpeedElement = document.createElement('p');
    windSpeedElement.textContent = `Wind Speed: ${windSpeed} m/s`;
    currentWeatherContainer.appendChild(windSpeedElement);

    const weatherDescriptionElement = document.createElement('p');
    weatherDescriptionElement.textContent = `Weather: ${weatherDescription}`;
    currentWeatherContainer.appendChild(weatherDescriptionElement);

    const weatherIconElement = document.createElement('img');
    weatherIconElement.src = `http://openweathermap.org/img/wn/${weatherIcon}.png`;
    weatherIconElement.alt = weatherDescription;
    currentWeatherContainer.appendChild(weatherIconElement);
}

// Function to display 5-day forecast data
function displayForecast(data) {
    const forecastContainer = document.getElementById('forecast-container');
    forecastContainer.innerHTML = ''; // Clear current forecast information

    // Loop through the forecast data for the next 5 days
    const nextFiveDays = data.list.slice(0, 5);
    nextFiveDays.forEach(forecast => {
        const date = new Date(forecast.dt * 1000);
        const temperature = forecast.main.temp;
        const humidity = forecast.main.humidity;
        const windSpeed = forecast.wind.speed;
        const weatherDescription = forecast.weather[0].description;
        const weatherIcon = forecast.weather[0].icon;
        const temperatureFahrenheit = ((temperature - 273.15) * 9/5 + 32).toFixed(2);

        // Create HTML elements to display forecast data
        const dateElement = document.createElement('h3');
        dateElement.textContent = date.toLocaleDateString();
        forecastContainer.appendChild(dateElement);

        const temperatureElement = document.createElement('p');
        temperatureElement.textContent = `Temperature: ${temperatureFahrenheit}°F`;
        forecastContainer.appendChild(temperatureElement);

        const humidityElement = document.createElement('p');
        humidityElement.textContent = `Humidity: ${humidity}%`;
        forecastContainer.appendChild(humidityElement);

        const windSpeedElement = document.createElement('p');
        windSpeedElement.textContent = `Wind Speed: ${windSpeed} m/s`;
        forecastContainer.appendChild(windSpeedElement);

        const weatherDescriptionElement = document.createElement('p');
        weatherDescriptionElement.textContent = `Weather: ${weatherDescription}`;
        forecastContainer.appendChild(weatherDescriptionElement);

        const weatherIconElement = document.createElement('img');
        weatherIconElement.src = `http://openweathermap.org/img/wn/${weatherIcon}.png`;
        weatherIconElement.alt = weatherDescription;
        forecastContainer.appendChild(weatherIconElement);
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
        displayCurrentWeather(data);

        // Store searched city in local storage and update search history
        if (!searchHistory.includes(city)) {
            searchHistory.push(city);
            localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
        }
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
