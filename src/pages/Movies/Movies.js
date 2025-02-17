import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import "./Movies.css"; 

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = "628e1093670d9988e3ece96d74865724";

  const favoriteCategories = [
    { id: 28, name: "Action" },
    { id: 35, name: "Comedy" },
    { id: 18, name: "Drama" },
    { id: 27, name: "Horror" },
    { id: 10749, name: "Romance" }
  ];

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
      );
      const data = await response.json();
      setCategories(data.genres);
    } catch (error) {
      console.error("Erreur lors de la récupération des catégories :", error);
    }
  };

  const fetchMovies = async (category) => {
    try {
      setLoading(true);
      const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${category}`;
      const response = await fetch(url);
      const data = await response.json();
      setMovies(data.results);
      setLoading(false);
    } catch (error) {
      console.error("Erreur lors de la récupération des films :", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetchMovies(selectedCategory);
    } else {
      setMovies([]); // Si aucune catégorie n'est sélectionnée, on vide les films
    }
  }, [selectedCategory]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const MovieSection = ({ title, categoryId }) => {
    const [categoryMovies, setCategoryMovies] = useState([]);

    useEffect(() => {
      const fetchCategoryMovies = async () => {
        try {
          const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${categoryId}`;
          const response = await fetch(url);
          const data = await response.json();
          setCategoryMovies(data.results.slice(0, 5)); // Afficher 5 films seulement
        } catch (error) {
          console.error("Erreur :", error);
        }
      };
      fetchCategoryMovies();
    }, [categoryId]);

    return (
      <div className="movie-section">
        <h2 className="section-title">{title}</h2>
        <div className="movies-grid">
          {categoryMovies.length > 0 ? (
            categoryMovies.map((movie) => (
              <div key={movie.id} className="movie-card">
                <Link to={`/movie/${movie.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="movie-image"
                  />
                  <h3 className="movie-title">{movie.title}</h3>
                </Link>
              </div>
            ))
          ) : (
            <p className="no-movies">Aucun film trouvé.</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="movies-container">
      {/* Menu déroulant pour sélectionner une catégorie */}
      <div className="category-dropdown">
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">-- Sélectionnez une catégorie --</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Affichage des films selon la catégorie sélectionnée */}
      {loading ? (
        <p className="loading">Chargement...</p>
      ) : (
        selectedCategory && (
          <div className="movies-grid">
            {movies.map((movie) => (
              <div className="movie-card" key={movie.id}>
                <Link to={`/movie/${movie.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="movie-image"
                  />
                  <h3>{movie.title}</h3>
                </Link>
              </div>
            ))}
          </div>
        )
      )}

      {/* Sections des catégories favorites */}
      {favoriteCategories.map((cat) => (
        <MovieSection key={cat.id} title={cat.name} categoryId={cat.id} />
      ))}
    </div>
  );
};

export default Movies;
