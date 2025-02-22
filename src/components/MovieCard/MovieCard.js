// src/components/MovieCard/MovieCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <h3>{movie.title}</h3>
        <p>{new Date(movie.release_date).getFullYear()}</p>
        <span>⭐ {movie.vote_average}</span>
      </Link>
    </div>
  );
};

export default MovieCard;
