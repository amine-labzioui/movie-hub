// src/pages/Favorites/Favorites.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Favorites.css';

const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from LocalStorage
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  // Remove movie from favorites
  const removeFavorite = (id) => {
    const updatedFavorites = favorites.filter((movie) => movie.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="favorites-page">
      <h1>My Favorite Movies</h1>
      {favorites.length > 0 ? (
        <div className="favorites-grid">
          {favorites.map((movie) => (
            <div key={movie.id} className="favorite-card">
              <Link to={`/movie/${movie.id}`}>
                <img src={`${IMG_URL}${movie.poster_path}`} alt={movie.title} />
                <h2>{movie.title}</h2>
              </Link>
              <button 
                className="remove-btn" 
                onClick={() => removeFavorite(movie.id)}>
                Remove from Favorites
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No favorite movies added yet!</p>
      )}
    </div>
  );
};

export default Favorites;
