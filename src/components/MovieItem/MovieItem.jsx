import { Link } from "react-router-dom";
import { Info } from "lucide-react";
import "./MovieItem.css";

export default function MovieItem({ movie }) {
  const imgPath = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/300x450?text=No+Image";

  return (
    <div className="movie-card">
      <div className="movie-card__image">
        <img src={imgPath} alt={movie.title} title={movie.title} loading="lazy" />
        <div className="movie-card__overlay">
          <div className="movie-buttons">
            <Link to={`/movies/${movie.id}`} className="details-btn" aria-label={`More details about ${movie.title}`}>
              <Info size={18} />
              <span>Details</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="movie-card__content">
        <h3>{movie.title}</h3>
        <p>{movie.release_date?.split("-")[0] || "N/A"}</p>
      </div>
    </div>
  );
}