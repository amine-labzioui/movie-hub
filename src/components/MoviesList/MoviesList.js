// src/components/MoviesList/MoviesList.js
import React, { useState, useEffect } from 'react';
import Movie from '../../pages/Movie/Movie';
import Loading from '../Loading/Loading';
import Error from '../Error/Error';
import './MoviesList.css';
import Movie from '../../pages/Movie/Movie';
const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=628e1093670d9988e3ece96d74865724`)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load movies. Please try again later.");
        setLoading(false);
      });
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <div className="movies-list">
      {movies.map((movie) => (
        <Movie key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MoviesList;
