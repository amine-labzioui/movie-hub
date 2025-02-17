// src/pages/SearchResults/SearchResults.js
import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import './SearchResults.css';

const API_KEY = '628e1093670d9988e3ece96d74865724';
const IMG_URL = 'https://image.tmdb.org/t/p/original';

const SearchResults = () => {
  const [movies, setMovies] = useState([]);
  const query = new URLSearchParams(useLocation().search).get('query');

  // Récupérer les résultats de recherche
  useEffect(() => {
    if (query) {
      axios
        .get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`)
        .then((res) => setMovies(res.data.results))
        .catch((err) => console.log(err));
    }
  }, [query]);

  return (
    <div className="search-results">
      <h2>Search Results</h2>
      <div className="movie-grid">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <Link to={`/movie/${movie.id}`}>
                <img
                  src={movie.poster_path ? `${IMG_URL}${movie.poster_path}` : 'https://via.placeholder.com/300x450'}
                  alt={movie.title}
                />
                <h3>{movie.title}</h3>
                <p>⭐ {movie.vote_average}</p>
                <p>📅 {movie.release_date}</p>
              </Link>
            </div>
          ))
        ) : (
          <p>No results found for "{query}"</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
