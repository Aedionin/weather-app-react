import React from 'react';
import WeatherMap from './WeatherMap';

const WeatherDisplay = ({ weather, unit }) => {
  const tempUnit = unit === 'metric' ? '°C' : '°F';

  if (!weather || !weather.current || !weather.forecast) {
    return <p>Loading...</p>;
  }

  const { current, forecast } = weather;

  if (!current.main || !current.weather || !forecast.list) {
    return <p>Data unavailable</p>;
  }

  const forecastItems = forecast.list.slice(0, 5).map((item) => (
    <div key={item.dt} className="forecast-item">
      <p>{new Date(item.dt * 1000).toLocaleDateString()}</p>
      <p>Temp: {Math.round(item.main.temp)}{tempUnit}</p>
      <p>{item.weather[0].description}</p>
    </div>
  ));

  return (
    <div className="weather-display">
      <h2>{current.name}</h2>
      <p>Temperature: {Math.round(current.main.temp)}{tempUnit}</p>
      <p>Weather: {current.weather[0].description}</p>
      <p>Humidity: {current.main.humidity}%</p>

      <WeatherMap lat={current.coord.lat} lon={current.coord.lon} />

      <h3>5-Day Forecast:</h3>
      <div className="forecast-container">
        {forecastItems}
      </div>
    </div>
  );
};

export default WeatherDisplay;
