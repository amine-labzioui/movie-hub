// src/components/Navbar.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const API_KEY = "628e1093670d9988e3ece96d74865724";

  // Fonction pour gérer la recherche
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
      setSuggestions([]);
    }
  };

  // Fonction pour obtenir les suggestions
  const fetchSuggestions = async (query) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
      );
      if (!response.ok) {
        throw new Error(`Erreur HTTP ! statut : ${response.status}`);
      }
      const data = await response.json();
      setSuggestions(data.results.slice(0, 5));  // Limiter à 5 suggestions
    } catch (error) {
      console.error("Erreur lors de la récupération des suggestions :", error);
    }
  };

  // Mettre à jour les suggestions quand le terme de recherche change
  useEffect(() => {
    if (searchTerm.length > 2) {
      fetchSuggestions(searchTerm);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  // Fonction pour gérer le clic sur une suggestion
  const handleSuggestionClick = (title) => {
    setSearchTerm(title);
    setSuggestions([]);
    navigate(`/search?query=${encodeURIComponent(title)}`);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" style={{ color: "#3498db", textDecoration: "none" }}>MovieHub</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/movies">Movies</Link></li>
        <li><Link to="/favorites">Favorites</Link></li>
      </ul>
      <form className="navbar-search" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
        {suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((movie) => (
              <li
                key={movie.id}
                onClick={() => handleSuggestionClick(movie.title)}
              >
                {movie.title}
              </li>
            ))}
          </ul>
        )}
      </form>
    </nav>
  );
};

export default Navbar;
