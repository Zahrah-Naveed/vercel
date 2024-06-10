import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './SearchBar.css'; 

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
    onSearch(searchTerm);  
  };

  return (
    <div className="searchBarContainer">
      <form onSubmit={handleSubmit} autoComplete="off" className="recommendationSearchbar">
        <div className="searchBar">
          <FiSearch aria-hidden="true" className="searchIcon" />
          <input
            name="search-field"
            autoComplete="on"
            id="search-field"
            className="searchInput"
            placeholder="Search"
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button type="submit" className="searchButton">Search</button>
      </form>
    </div>
  );
};

export default SearchBar;
