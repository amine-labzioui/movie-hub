// src/pages/MovieDetails/MovieDetails.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './MovieDetails.css';

const API_KEY = '628e1093670d9988e3ece96d74865724';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/original';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  // Fetch movie details, cast, and similar movies
  useEffect(() => {
    axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err));

    axios.get(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`)
      .then((res) => setCast(res.data.cast.slice(0, 5))) // Only get top 5 cast members
      .catch((err) => console.log(err));

    axios.get(`${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`)
      .then((res) => setSimilarMovies(res.data.results.slice(0, 6))) // Get top 6 similar movies
      .catch((err) => console.log(err));

    // Check if the movie is in favorites
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setIsFavorite(favorites.some((fav) => fav.id === parseInt(id)));
  }, [id]);

  // Add or remove from favorites
  const handleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (isFavorite) {
      // Remove from favorites
      const updatedFavorites = favorites.filter((fav) => fav.id !== movie.id);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } else {
      // Add to favorites
      favorites.push(movie);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    setIsFavorite(!isFavorite);
  };

  return (
    <div className="movie-details">
      {movie && (
        <>
          <div className="backdrop">
            <img src={`${IMG_URL}${movie.backdrop_path}`} alt={movie.title} />
            <h1>{movie.title}</h1>
          </div>
          <div className="movie-info">
            <p><strong>Release Date:</strong> {movie.release_date}</p>
            <p><strong>Runtime:</strong> {movie.runtime} mins</p>
            <p><strong>Rating:</strong> ⭐ {movie.vote_average}</p>
            <p><strong>Overview:</strong> {movie.overview}</p>
            <button onClick={handleFavorite} className="favorite-btn">
              {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
          </div>

          <div className="cast">
            <h2>Cast</h2>
            <ul>
              {cast.map((member) => (
                <li key={member.id}>{member.name} as {member.character}</li>
              ))}
            </ul>
          </div>

          <div className="similar-movies">
            <h2>Similar Movies</h2>
            <div className="movie-grid">
              {similarMovies.map((movie) => (
                <div key={movie.id} className="movie-card">
                  <Link to={`/movie/${movie.id}`}>
                    <img src={`${IMG_URL}${movie.poster_path}`} alt={movie.title} />
                    <h3>{movie.title}</h3>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
