import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Weather = () => {

    const [ location, setLocation ] = useState()
    const [ degrees, setDegrees] = useState()
    const [ isDegrees, setIsDegrees ] = useState(true)
    
    useEffect(() => {
        const geolocation = (position) => {
            // console.log(position)
            const latitude = position.coords.latitude
            const longitude = position.coords.longitude

            const weatherApi =  `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=69dd21e8c81f43762aebbf2dd452bfa9`
    
            axios.get(weatherApi)
            .then(res => {
                setLocation(res.data)
                setDegrees(Math.trunc((res.data.main.temp) -273.15))
            })
        }

        const error = (error) => {
            console.log(error)
        }

        navigator.geolocation.getCurrentPosition(geolocation, error)
    }, [])

        const degreesCelsius = Math.trunc((location?.main?.temp) - 273.15)
        const degreesFahrenheit = ((degrees * 9/5) + 32)
    
        const urlIcon = location?.weather?.[0].icon
        const icon = `http://openweathermap.org/img/wn/${urlIcon}.png`

        const changeDegrees = () => {
            if (isDegrees) {
                setDegrees(degreesFahrenheit)
                setIsDegrees(false)
            } else {
                setDegrees(degreesCelsius)
                setIsDegrees(true)
            }
        }
        
    return (
        <div className='container'>
            <p><b>Country: </b>{location?.sys?.country}</p>
            <p><b>City: </b>{location?.name}</p>
            <p><b>Temperatura: </b>{degrees} {isDegrees ? '°C' : '°F'}</p>
            <div className='icons'>
            <img src={icon} alt="icon weather"/>
            <button onClick={changeDegrees}>
                Change Units
            </button>
            </div>
        </div>
    );
};

export default Weather;