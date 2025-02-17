// src/components/SearchMovie/SearchMovie.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SearchMovie.css';

const API_KEY = '628e1093670d9988e3ece96d74865724';
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

const SearchMovie = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  // Handle input change and update query state
  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    // Fetch suggestions from TMDB API
    if (value) {
      fetch(SEARCH_API + value)
        .then((res) => res.json())
        .then((data) => {
          setSuggestions(data.results.slice(0, 5)); // Show top 5 suggestions
        });
    } else {
      setSuggestions([]);
    }
  };

  // Save search history to LocalStorage
  const saveSearchHistory = (term) => {
    const history = JSON.parse(localStorage.getItem('searchHistory')) || [];
    if (!history.includes(term)) {
      history.unshift(term);
      localStorage.setItem('searchHistory', JSON.stringify(history.slice(0, 5)));
    }
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      saveSearchHistory(query);
      navigate(`/search/${query}`);
      setQuery('');
      setSuggestions([]);
    }
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search for movies..."
          value={query}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>

      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((movie) => (
            <li key={movie.id}>
              <Link to={`/movie/${movie.id}`}>
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchMovie;
