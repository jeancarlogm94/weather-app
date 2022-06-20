import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Weather = () => {
  const [location, setLocation] = useState();
  const [degrees, setDegrees] = useState();
  const [isDegrees, setIsDegrees] = useState(true);

  useEffect(() => {
    const geolocation = (position) => {
      // console.log(position)
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      const weatherApi = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=9e40f0c1a5900c65acf188e03f200692`;

      axios.get(weatherApi).then((res) => {
        setLocation(res.data);
        setDegrees(Math.trunc(res.data.main.temp - 273.15));
      });
    };

    const error = (error) => {
      console.log(error);
    };

    navigator.geolocation.getCurrentPosition(geolocation, error);
  }, []);

  const degreesCelsius = Math.trunc(location?.main?.temp - 273.15);
  const degreesFahrenheit = (degrees * 9) / 5 + 32;

  const urlIcon = location?.weather?.[0].icon;
  const icon = `http://openweathermap.org/img/wn/${urlIcon}.png`;

  const changeDegrees = () => {
    if (isDegrees) {
      setDegrees(degreesFahrenheit);
      setIsDegrees(false);
    } else {
      setDegrees(degreesCelsius);
      setIsDegrees(true);
    }
  };

  console.log(location?.weather?.[0].main);

  return (
    <div className="container">
      <h1>WEATHER APP</h1>
      <img src={icon} alt="icon weather" />
      <h2>
        {degrees} {isDegrees ? '°C' : '°F'}
      </h2>
      <h3>{location?.weather?.[0].main}</h3>
      {/* <h3>{location?.weather?.[0].description}</h3> */}
      <p></p>
      <p>
        {location?.name}, {location?.sys?.country}
      </p>
      <div className="icons">
        <button onClick={changeDegrees}>Change Units</button>
      </div>
    </div>
  );
};

export default Weather;
