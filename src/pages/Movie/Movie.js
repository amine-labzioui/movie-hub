import React from 'react';
import './Movie.css';
const API_URL = "https://api.themoviedb.org/3/movie/popular?api_key=628e1093670d9988e3ece96d74865724";
const Movie = ({ movie }) => {
  return (
    <div className="movie-card">
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : 'https://via.placeholder.com/500x750?text=No+Image+Available'
        }
        alt={movie.title || 'No Title Available'}
      />
      <h3>{movie.title || 'No Title Available'}</h3>
      <p>Rating: {movie.vote_average || 'N/A'}</p>
    </div>
  );
};

export default Movie;
