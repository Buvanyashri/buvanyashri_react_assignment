import React, { useState } from 'react';
import './css/SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="search-bar"> {/* Add class name for styling */}
      <input 
        type="text" 
        placeholder="Enter Applicant ID" 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
