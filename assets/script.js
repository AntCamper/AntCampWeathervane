function displayCurrentWeather(data) {
    const weatherContainer = document.getElementById('weather-container');
    weatherContainer.innerHTML = ''; // Clear previous weather information

    const cityName = data.name;
    const temperature = data.main.temp; // Temperature in Kelvin
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const weatherDescription = data.weather[0].description;
    const weatherIcon = data.weather[0].icon; // Icon code

    // Convert temperature from Kelvin to Fahrenheit
    const temperatureFahrenheit = ((temperature - 273.15) * 9/5 + 32).toFixed(2);

    //HTML elements to display the weather information
    const cityElement = document.createElement('h2');
    cityElement.textContent = cityName;
    weatherContainer.appendChild(cityElement);

    const temperatureElement = document.createElement('p');
    temperatureElement.textContent = `Temperature: ${temperatureFahrenheit}°F`;
    weatherContainer.appendChild(temperatureElement);

    const humidityElement = document.createElement('p');
    humidityElement.textContent = `Humidity: ${humidity}%`;
    weatherContainer.appendChild(humidityElement);

    const windSpeedElement = document.createElement('p');
    windSpeedElement.textContent = `Wind Speed: ${windSpeed} m/s`;
    weatherContainer.appendChild(windSpeedElement);

    const weatherDescriptionElement = document.createElement('p');
    weatherDescriptionElement.textContent = `Weather: ${weatherDescription}`;
    weatherContainer.appendChild(weatherDescriptionElement);

    // Display weather icon
    const weatherIconElement = document.createElement('img');
    weatherIconElement.src = `http://openweathermap.org/img/wn/${weatherIcon}.png`;
    weatherIconElement.alt = weatherDescription;
    weatherContainer.appendChild(weatherIconElement);
}

function displayForecast(data) {
    const forecastContainer = document.getElementById('forecast-container');
    forecastContainer.innerHTML = ''; // Clear previous forecast information

    // Filter forecast data to include only the next five days
    const nextFiveDays = data.list.filter(forecast => {
        const forecastDate = new Date(forecast.dt * 1000);
        const today = new Date();
        return forecastDate.getDate() >= today.getDate();
    }).slice(0, 5); // Limit to the next five days

    nextFiveDays.forEach(forecast => {
        const date = new Date(forecast.dt * 1000); // Convert Unix timestamp to Date object
        const temperature = forecast.main.temp; // Temperature in Kelvin
        const humidity = forecast.main.humidity;
        const windSpeed = forecast.wind.speed;
        const weatherDescription = forecast.weather[0].description;
        const weatherIcon = forecast.weather[0].icon;
        // Convert temperature from Kelvin to Fahrenheit
        const temperatureFahrenheit = ((temperature - 273.15) * 9/5 + 32).toFixed(2);

       //HTML elements to display the forecast data
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

        // Display weather icon
        const weatherIconElement = document.createElement('img');
        weatherIconElement.src = `http://openweathermap.org/img/wn/${weatherIcon}.png`;
        weatherIconElement.alt = weatherDescription;
        forecastContainer.appendChild(weatherIconElement);
    });
}
