import React, { useState, useEffect } from 'react';
import WeatherDisplay from './components/WeatherDisplay';
import './App.css';

const App = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('Warsaw');
  const [unit, setUnit] = useState('metric');

  useEffect(() => {
    const fetchWeather = async () => {
      const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
      const unitParam = unit === 'metric' ? 'metric' : 'imperial';

      try {
        const currentWeatherResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unitParam}&appid=${apiKey}`
        );
        const currentWeatherData = await currentWeatherResponse.json();

        const forecastResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unitParam}&appid=${apiKey}`
        );
        const forecastData = await forecastResponse.json();

        setWeather({ current: currentWeatherData, forecast: forecastData });
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setWeather(null);
      }
    };

    fetchWeather();
  }, [city, unit]);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather App</h1>
        <input
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="Enter city"
        />
        <div>
          <button onClick={() => setUnit('metric')}>Celsius</button>
          <button onClick={() => setUnit('imperial')}>Fahrenheit</button>
        </div>
        <WeatherDisplay weather={weather} unit={unit} />
      </header>
    </div>
  );
};

export default App;
