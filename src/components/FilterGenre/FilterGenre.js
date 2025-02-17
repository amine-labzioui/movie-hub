import React, { useState, useEffect } from 'react';
import './FilterGenre.css';

const FilterGenre = ({ onGenreSelect }) => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=628e1093670d9988e3ece96d74865724`)
      .then((res) => res.json())
      .then((data) => {
        setGenres(data.genres || []);
      })
      .catch((err) => {
        console.error("Failed to load genres", err);
      });
  }, []);

  const handleGenreChange = (e) => {
    onGenreSelect(e.target.value);
  };

  return (
    <div className="filter-genre">
      <select onChange={handleGenreChange}>
        <option value="">All Genres</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterGenre;
