import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "./MoviesDetails.css"

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`https://movies-backend-t01n.onrender.com/movies/${id}`, {
          headers: {
            Authorization: 'Bearer FSMovies2023' // Include the Bearer token in the headers
          }
        });
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="moviedetail-card">
      <img src={movie.poster} alt={movie.title} />
      <div className="moviedetail-details">
        <h2>{movie.title}</h2>
        <p><b>Director:</b> {movie.director.join(', ')}</p>
        <p><b>Genres:</b> {movie.genres.join(', ')}</p>
        <p><b>IMDb Rating:</b> {movie.imdb_rating}</p>
        <p><b>Length:</b> {movie.length}</p>
        <p><b>Released On:</b> {new Date(movie.released_on).toLocaleDateString()}</p>
        <p className={`classificationdetail ${getClassificationColor(movie.classification)}`}>
  {movie.classification}
</p>        <p><b>Overview:</b> {movie.overview}</p>
        <p><b>Cast:</b> {movie.cast.join(', ')}</p>
      </div>
    </div>
  );
}
const getClassificationColor = (classification) => {
    switch (classification) {
      case "7+":
        return "green"; // Green for 7+
      case "13+":
        return "yellow"; // Yellow for 13+
      case "18+":
        return "red"; // Red for 18+
      default:
        return ""; // Default color
    }
  }
export default MovieDetails;
