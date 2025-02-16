import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState(null); // Set initial data to null
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');

  const url = `http://api.weatherapi.com/v1/current.json?key=091964407c584478b03235957251502&q=${location}`;

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      setData(null); // Set data to null while waiting for response
      setError('');
      
      axios
        .get(url)
        .then((response) => {
          setData(response.data);
          setError(''); // Clear any previous error after successful response
        })
        .catch((error) => {
          setData(null); // Clear data in case of an error
          setError('Error: Location not found or invalid API URL');
          console.log(error);
        });

      setLocation('');
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          placeholder="Enter Location"
          onKeyPress={searchLocation}
          type="text"
        />
      </div>

      <div className="container">
        {error && <p className="error-message">{error}</p>} {/* Display error message if there's an error */}

        <div className="top">
          <div className="location">
            <p>
              {/* Show "Start searching" if no data and no location */}
              {data ? data.location?.name : location === '' ? 'Start searching' : 'Loading...'}
            </p>
          </div>
          <div className="temp">
            {data?.current ? <h1>{data.current.temp_c}°C</h1> : null}
          </div>
          <div className="description">
            <p>Clouds</p>
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
            {data?.current ? <p className="bold">{data.current.wind_mph}</p> : null}
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
