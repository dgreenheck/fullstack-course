import React from "react"

const SearchBar = ({ value, onChange }) => {
  return (
    <form>
      <label>
        Search Country Name:
        <input type="text" name="search" onChange={onChange} value={value} />
      </label>
    </form>
  )
}

export default SearchBar;