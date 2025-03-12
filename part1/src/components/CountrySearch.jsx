import React, { useState, useEffect} from 'react'
import axios from 'axios'

const CountrySearch = () => {
    const [query, setQuery] = useState('')
    const [countries, setCountries] = useState([])
    const [message, setMessage] = useState('')
    const [weather, setWeather] = useState(null)


    const apiKey = import.meta.env.VITE_API_KEY
  
    useEffect(() => {
      if (query) {
        axios
          .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
          .then(response => {
            const filteredCountries = response.data.filter(country =>
              country.name.common.toLowerCase().includes(query.toLowerCase())
            )
            setCountries(filteredCountries)
            if (filteredCountries.length > 10) {
              setMessage('Too many matches, specify another filter')
              setCountries([])
            } else if (filteredCountries.length === 0) {
              setMessage('No matches found')
            } else {
              setMessage('')
            }
          })
          .catch(error => {
            setMessage(`Error fetching countries: ${error.message}`)
          })
      } else {
        setCountries([])
        setMessage('')
      }
    }, [query])

    useEffect(() => {
        if (countries.length === 1) {
          const capital = countries[0].capital[0]
          axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`)
            .then(response => {
              setWeather(response.data)
            })
            .catch(error => {
              console.error('Error fetching weather data:', error)
            })
        }
      }, [countries, apiKey])
    

    const handleQueryChange = (event) => {
        setQuery(event.target.value)
    }
    
    return (
        <div>
      <h2>Find countries</h2>
      <input value={query} onChange={handleQueryChange} />
      {message && <p>{message}</p>}
      <ul>
        {countries.map(country => (
          <li key={country.cca3}>
            {country.name.common}
            <button onClick={() => setCountries([country])}>Show</button>
          </li>
        ))}
      </ul>
      {countries.length === 1 && (
        <div>
          <h3>{countries[0].name.common}</h3>
          <p>Capital: {countries[0].capital}</p>
          <p>Population: {countries[0].population}</p>
          <img src={countries[0].flags.png} alt={`Flag of ${countries[0].name.common}`} width="100" />
          {weather && (
            <div>
              <h3>Weather in {countries[0].capital}</h3>
              <p>Temperature: {weather.main.temp} °C</p>
              <p>Weather: {weather.weather[0].description}</p>
              <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="Weather icon" />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default CountrySearch