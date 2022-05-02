import { useState } from 'react';
import { useEffect } from 'react';
import './App.css';
import axios from 'axios'

import CountryList from './CountryList';
import CountryInfo from './CountryInfo';
import SearchBar from './SearchBar';

function App() {

  /* State */
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [countries, setCountries] = useState([])
  const [searchValue, setSearchValue] = useState("")

  /* Handlers */

  // Handler for changing search text
  const searchOnChange = (event) => {
    console.log(`Searching for ${event.target.value}`)
    setSearchValue(event.target.value)
  }

  // Handler for changing search text
  const selectCountryHandler = (country) => {
    console.log(`Selecting ${country.name.common}`)
    setSelectedCountry(country)
  }

  // Handler for changing search text
  const deselectCountryHandler = () => {
    console.log(`Deselecting ${selectedCountry.name.common}`)
    setSelectedCountry(null)
  }

  /* Effects */
  
  // Effect for retrieving countries
  const retrieveCountries = useEffect(() => {
    console.log('GET countries from: https://restcountries.com/v3.1/all')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log(`Received ${response.data.length} entries`)
        setCountries(response.data)
      })
  }, [])

  // Filter list of countries by the search text
  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchValue.toLowerCase())
  )

  // If search text is an exact match, show the info
  let exactMatch = countries.some(country =>
    country.name.common.toLowerCase() === searchValue.toLowerCase()
  )

  let bodyElement;
  
  // No Countries
  if (filteredCountries.length == 0) {
    console.log("No results found")
    bodyElement = <p>No results found.</p>
  // User pressed Info button for a country
  } else if (selectedCountry != null) {
    bodyElement = <CountryInfo country={selectedCountry} onClose={deselectCountryHandler} />
  // Search text exact match or manually showing info  
  } else if (filteredCountries.length == 1 || exactMatch) {
    console.log(`Showing info for ${filteredCountries[0]}`)
    bodyElement = <CountryInfo country={filteredCountries[0]} onClose={() => setSearchValue('')} />
  // More than 25 countries
  } else if (filteredCountries.length > 25) {
    console.log(`Filtered countries count ${filteredCountries.length} > 25, too many matches to show`)
    bodyElement = <p>Too many matches, specify another filter</p>
  } else {
    console.log(`Displaying ${filteredCountries.length} countries in the list`) 
    bodyElement = <CountryList countries={filteredCountries} showInfoHandler={selectCountryHandler} />
  }

  return (
    <div>
      <SearchBar onChange={searchOnChange} value={searchValue} />
      {bodyElement}
    </div>
  )
}


export default App;
