import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./Movies.css";

export default function Movies() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=5b6aa098ca6a50e070ed4a4bbe11e49e&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => setMovie(data))
      .catch((err) => console.error("Movie details fetch error:", err));
  }, [id]);

  if (!movie) return <div className="movie-details">Loading...</div>;

  const imdbUrl = movie.imdb_id
    ? `https://www.imdb.com/title/${movie.imdb_id}`
    : null;

  return (
    <div className="movie-details">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <div className="movie-info">
        <h2>{movie.title}</h2>
        <p>
          <strong>📅 Release Date:</strong> {movie.release_date}
        </p>
        <p>
          <strong>Rating:</strong> {movie.vote_average} ⭐
        </p>
        <p>
          <strong>📃 Overview:</strong> {movie.overview}
        </p>

        {imdbUrl && (
          <a
            href={imdbUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="imdb-link"
          >
            View on IMDb
          </a>
        )}

        <Link to={`/booking/${movie.id}`} className="book-btn">
          Book Now
        </Link>
      </div>
    </div>
  );
}