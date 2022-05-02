import React from "react"

const CountryList = ({ countries, showInfoHandler }) => {
  return (
    <ul>
      {countries.map(country =>
        <CountryListItem
          key={country.name.common}
          country={country}
          onClick={showInfoHandler}
        />)}
    </ul>
  )
}

const CountryListItem = ({ country, onClick }) => {
  return (
    <li key={country.name.common}>
      {country.name.common}
      <button onClick={() => onClick(country)}>Info</button>
    </li>
  )
}

export default CountryList;