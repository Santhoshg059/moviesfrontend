import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./Home.css";
import search from "../images/search-icon.png"

function Home() {
  const [moviesByGenre, setMoviesByGenre] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOption, setFilterOption] = useState('director');

  useEffect(() => {
    // Fetch movies from backend
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:8000/movies', {
          headers: {
            Authorization: 'Bearer FSMovies2023' // Include the Bearer token in the headers
          }
        });
        // Group movies by genre
        const groupedMovies = groupMoviesByGenre(response.data);
        setMoviesByGenre(groupedMovies);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  // Function to group movies by genre
  const groupMoviesByGenre = (movies) => {
    const groupedMovies = {};
    movies.forEach((movie) => {
      movie.genres.forEach((genre) => {
        if (!groupedMovies[genre]) {
          groupedMovies[genre] = [];
        }
        groupedMovies[genre].push(movie);
      });
    });
    return groupedMovies;
  };

  // Function to handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Function to handle filter option change
  const handleFilterChange = (e) => {
    setFilterOption(e.target.value);
    setSearchTerm('');
  };

  // Function to filter movies based on search term and filter option
  const filterMovies = (movies) => {
    if (!searchTerm) {
      return movies;
    }
    return movies.filter((movie) => {
      switch (filterOption) {
        case 'director':
          return movie.director.some((director) => director.toLowerCase().includes(searchTerm.toLowerCase()));
        case 'genre':
          return movie.genres.some((genre) => genre.toLowerCase().includes(searchTerm.toLowerCase()));
        case 'movie':
          return movie.title.toLowerCase().includes(searchTerm.toLowerCase());
        default:
          return true;
      }
    });
  };

  return (
    <div>
      {/* Search container */}
      <div className="search-container">
        {/* Dropdown for filter option */}
        <select value={filterOption} onChange={handleFilterChange}>
          <option value="director">Director</option>
          <option value="genre">Genre</option>
          <option value="movie">Movie Name</option>
        </select>
        {/* Search input */}
        <input
          type="text"
          className="search-input"
          placeholder={`Search by ${filterOption}`}
          value={searchTerm}
          onChange={handleSearch}
        />
        {/* Search icon */}
        <img
          src={search}
          alt="Search"
          className="search-icon"
          onClick={handleSearch}
        />
      </div>

      {/* Movies grouped by genre */}
      {Object.keys(moviesByGenre).map((genre) => (
        filterMovies(moviesByGenre[genre]).length > 0 && ( // Conditionally render genre headline
          <div key={genre}>
            <h2 className="genre-title">{genre}</h2>
            <div className="movie-cards">
              {filterMovies(moviesByGenre[genre]).map((movie, index) => (
                 <Link key={index} to={`/MovieDetails/${movie._id}`} className="movie-link">
                 <div className="movie-card">
                   <img src={movie.poster} alt={movie.title} />
                   <div className="movie-details">
                     <h3>{movie.title}</h3>
                     <p><b>Directors:</b> {Array.isArray(movie.director) ? movie.director.join(', ') : movie.director}</p>
                     <p><b>IMDb Rating:</b> {movie.imdb_rating}</p>
                   </div>
                   <p className={`classification ${getClassificationColor(movie.classification)}`}>{movie.classification}</p>
                 </div>
               </Link>
              ))}
            </div>
          </div>
        )
        
      ))}
      {Object.values(moviesByGenre).every((movies) => filterMovies(movies).length === 0) && (
  <p className="no-data">No data found</p>
)}
    </div>
  );
}

// Function to determine classification color
const getClassificationColor = (classification) => {
  switch (classification) {
    case "7+":
      return "green";
    case "13+":
      return "yellow";
    case "18+":
      return "red";
    default:
      return "";
  }
}

export default Home;
