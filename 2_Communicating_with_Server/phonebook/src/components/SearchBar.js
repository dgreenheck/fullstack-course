import React from "react"

const SearchBar = ({ onChange, value }) => {
  return <>
    <h2>Search Contacts</h2>
    <div>
      Search: <input onChange={onChange} value={value} />
    </div>
  </>
}

export default SearchBar