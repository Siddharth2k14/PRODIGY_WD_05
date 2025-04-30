const apiKey = '5291ad6d0a8e4ff1879203116253004';
const fetchWeatherBtn = document.getElementById('fetchWeatherBtn');
const locationInput = document.getElementById('locationInput');
const weatherInfo = document.getElementById('weatherInfo');

fetchWeatherBtn.addEventListener('click', () => {
    const location = locationInput.value.trim();
    if (location) {
        fetchWeather(location); // Corrected function call
    } else {
        alert('Please enter a location');
    }
});

const fetchWeather = async (location) => {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        weatherInfo.innerHTML = `<p>Error fetching weather data: ${error.message}</p>`;
    }
};

const displayWeather = (data) => {
    const { location, current } = data; // Adjusted to match the Weather API response structure
    weatherInfo.innerHTML = `
        <h2>${location.name}</h2>
        <p>Temperature: ${current.temp_c}°C</p>
        <p>Condition: ${current.condition.text}</p>
        <p>Humidity: ${current.humidity}%</p>
    `;
};