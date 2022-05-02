import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const WeatherInfo = ({ country }) => {

  const [weather, setWeather] = useState(null);
  const [weatherIconCode, setWeatherIconCode] = useState("01d")
  
  const api_key = process.env.REACT_APP_API_KEY

  // Retrieve weather for the given country
  const getWeather = useEffect(() => {
    console.log(`Getting weather data for ${country.name.common} from api.openweathermap.org/data/2.5/weather...`)
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${api_key}`)
      .then(response => {
        console.log(`Received weather data for ${country.name.common}`)

        let weatherData = response.data
        setWeather(weatherData)
        if (weatherData.weather.length > 0) {
          setWeatherIconCode(weatherData.weather[0].icon)
        }
      })
  }, [])

  if (weather == null) {
    return (
      <>
        <h2>Weather in {country.name.common}</h2>
        <p>Loading...</p>
      </>
    )
  } else {
    console.log(`http://openweathermap.org/img/wn/${weatherIconCode}@2x.png`)
    let farenheit = convertKelvinToFarenheit(weather.main.temp).toFixed(2)
    let celsius = convertKelvinToCelsius(weather.main.temp).toFixed(2)
    return (
      <>
        <h2>Weather in {country.name.common}</h2>
        <p>Temperature: {farenheit} F / {celsius} C</p>
        <img src={`http://openweathermap.org/img/wn/${weatherIconCode}@2x.png`} />
        <p>Wind: {weather.wind.speed.toFixed(1)} m/s</p>
      </>
    )
  }
}

function convertKelvinToFarenheit(kelvin) {
  return (kelvin - 273.15) * 1.8 + 32
}

function convertKelvinToCelsius(kelvin) {
  return kelvin - 273.15
}

export default WeatherInfo;