// src/pages/Home/Home.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Home.css';
import { FaHeart } from 'react-icons/fa';

const API_KEY = '628e1093670d9988e3ece96d74865724';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [movieDetails, setMovieDetails] = useState({});
  const [favorites, setFavorites] = useState([]);

  // Charger les favoris depuis LocalStorage
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  // Sauvegarder les favoris dans LocalStorage
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Fonction pour gérer les favoris
  const toggleFavorite = (movie) => {
    const isFavorite = favorites.some((fav) => fav.id === movie.id);
    if (isFavorite) {
      // Retirer des favoris
      setFavorites(favorites.filter((fav) => fav.id !== movie.id));
    } else {
      // Ajouter aux favoris
      setFavorites([...favorites, movie]);
    }
  };

  // Fonction pour récupérer les détails de chaque film
  const fetchMovieDetails = async (movieId) => {
    try {
      const response = await axios.get(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des détails du film :", error);
      return null;
    }
  };

  useEffect(() => {
    // Récupération des films Trending
    axios
      .get(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`)
      .then((res) => {
        setTrendingMovies(res.data.results);
        res.data.results.forEach(async (movie) => {
          const details = await fetchMovieDetails(movie.id);
          setMovieDetails((prevDetails) => ({
            ...prevDetails,
            [movie.id]: details,
          }));
        });
      })
      .catch((err) => console.log(err));

    // Récupération des films Populaires
    axios
      .get(`${BASE_URL}/movie/popular?api_key=${API_KEY}`)
      .then((res) => {
        setPopularMovies(res.data.results);
        res.data.results.forEach(async (movie) => {
          const details = await fetchMovieDetails(movie.id);
          setMovieDetails((prevDetails) => ({
            ...prevDetails,
            [movie.id]: details,
          }));
        });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="home-container">
      <h2 className="section-title">Trending This Week</h2>
      <div className="movies-grid">
        {trendingMovies.map((movie) => {
          const details = movieDetails[movie.id];
          const isFavorite = favorites.some((fav) => fav.id === movie.id);
          return (
            <div key={movie.id} className="movie-card">
              <Link to={`/movie/${movie.id}`} className="movie-link">
                <img
                  src={`${IMG_URL}${movie.poster_path}`}
                  alt={movie.title}
                  className="movie-image"
                />
                <h3 className="movie-title">{movie.title}</h3>
                {details && (
                  <>
                    <p className="movie-info">Durée : {details.runtime} min</p>
                    <p className="movie-info">Note : ⭐ {movie.vote_average}</p>
                    <p className="movie-info">Date de sortie : {details.release_date}</p>
                  </>
                )}
              </Link>
              <button
                className="favorite-button"
                onClick={() => toggleFavorite(movie)}
              >
                <FaHeart className={`heart-icon ${isFavorite ? 'favorite' : ''}`} />
                {isFavorite ? 'Retirer' : 'Ajouter'}
              </button>
            </div>
          );
        })}
      </div>

      <h2 className="section-title">Popular Movies</h2>
      <div className="movies-grid">
        {popularMovies.map((movie) => {
          const details = movieDetails[movie.id];
          const isFavorite = favorites.some((fav) => fav.id === movie.id);
          return (
            <div key={movie.id} className="movie-card">
              <Link to={`/movie/${movie.id}`} className="movie-link">
                <img
                  src={`${IMG_URL}${movie.poster_path}`}
                  alt={movie.title}
                  className="movie-image"
                />
                <h3 className="movie-title">{movie.title}</h3>
                {details && (
                  <>
                    <p className="movie-info">Durée : {details.runtime} min</p>
                    <p className="movie-info">Note : ⭐ {movie.vote_average}</p>
                    <p className="movie-info">Date de sortie : {details.release_date}</p>
                  </>
                )}
              </Link>
              <button
                className="favorite-button"
                onClick={() => toggleFavorite(movie)}
              >
                <FaHeart className={`heart-icon ${isFavorite ? 'favorite' : ''}`} />
                {isFavorite ? 'Retirer' : 'Ajouter'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
