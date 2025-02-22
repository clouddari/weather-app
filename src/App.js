import React, { useState } from 'react';
import axios from 'axios';
import humidity from "./assets/Component 2.png";

function App() {
  const [data, setData] = useState(null); // Set initial data to null
  const [forecast, setForecast] = useState(null);
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');

  const url = `http://api.weatherapi.com/v1/current.json?key=091964407c584478b03235957251502&q=${location}`;
  const url_forecast = `http://api.weatherapi.com/v1/forecast.json?key=091964407c584478b03235957251502&q=${location}&days=3`;

  const searchLocation = async (event) => {
    if (event.key === 'Enter') {
      setData(null);
      setForecast([]); // Set data to null while waiting for response
      setError('');

      try {
        // Fetch current weather
        const currentResponse = await axios.get(url);

        // Fetch forecast
        const forecastResponse = await axios.get(url_forecast);

        setData(currentResponse.data);
        setForecast(forecastResponse.data.forecast.forecastday);

      } catch (error) {
        setData(null);
        setForecast(null);
        setError("Error: Location not found or invalid API URL");
        console.error(error);
      }

      setLocation('');
    }

    if (data) {
      document.querySelector('.container').classList.add('loaded');
    }
  };

  return (
    <div className="app">
      <header className="header">
        <div className="logo">
          <h1>WeatherApp</h1>
        </div>
        <div className="search">
          <input
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="Enter Location"
            onKeyUp={searchLocation}
            type="text"
            aria-label="Search for a location"
          />
        </div>
      <nav>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#forecast">Forecast</a></li>
          <li><a href="#settings">Settings</a></li>
        </ul>
      </nav>
</header>


      <div className="container">
        {error && <p className="error-message">{error}</p>}
        <div className="before-forecast">
          <div className="top">
            <div className="location">
              <p className='bold'>
                {data ? data.location?.name : location === '' ? 'Start searching' : 'Loading...'}
              </p>
              {data?.location ? <p>{data.location.country}, {data.location.region} </p> : null}
            </div>

            <div className="temp-condition">
              <div className="temp">
                {data?.current ? <h1>{data.current.temp_c}°C</h1> : null}
              </div>
              <div className="description">
                {data?.current ? <img className="weather-icon" src={data.current.condition.icon} alt="weather icon" /> : null}
                {data?.current ? <p>{data.current.condition.text}</p> : null}
              </div>
            </div>

            <div className="last-upd">
              {data?.current ? <p>Last Updated: {data.current.last_updated}</p> : null}
            </div>
          </div>

          <div className="bottom">
            <div className="feels">
              {data?.current ? <p className="bold">{data.current.feelslike_c}°C</p> : null}
              <p>Feels Like </p>
            </div>
            <div className="humidity">
              {data?.current ? <p className="bold">{data.current.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data?.current ? <p className="bold">{data.current.wind_kph} km/h</p> : null}
              <p>Wind Speed</p>
            </div>

            <div className="wind-dir">
              {data?.current ? <p className="bold">{data.current.vis_km} km</p> : null}
              <p>Visibility</p>
            </div>
          </div>
        </div>
      </div>

      <h2 className='forecast-title'>3-Day Forecast</h2>

      <div className="forecast">
        {forecast && forecast.map((day) => (
           <div key={day.date} className="forecast-item">
                <p className="bold">{day.date}</p>
                <p>{day.day.condition.text}</p>
                <img className="weather-icon" src={day.day.condition.icon} alt="weather icon" />
                <p>Max: {day.day.maxtemp_c}°C</p>
                <p>Min: {day.day.mintemp_c}°C</p>
          </div>
             ))}
       </div>

      <footer>
        <p>&copy; 2025 WeatherApp. All rights reserved.</p>
        <p>Data provided by [API Name]</p>
      </footer>
    </div>
  );
}

export default App;
