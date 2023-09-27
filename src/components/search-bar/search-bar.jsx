import React from 'react';
import PropTypes from 'prop-types';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
    const handleSearch = event => {
      onSearch(event.target.value);
    };
  
    return (
        <div className="search-container">
          <input
          type="text"
          placeholder="Search"
          onChange={handleSearch}
          className="custom-search-bar"
          />
      </div>
    );
  };

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default SearchBar;
