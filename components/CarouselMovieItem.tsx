import { TMDBMovie } from "@/types";
import styles from "../styles/Carousel.module.css";
import Link from "next/link";

interface CarouselMovieItemProps {
  movie: TMDBMovie;
}

const containerStyle: React.CSSProperties = {
  position: "relative",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  boxSizing: "border-box",
  textDecoration: "none",
  color: "white",
};

const infoStyle: React.CSSProperties = {
  position: "absolute",
  bottom: 0,
  left: 0,
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
};

const titleStyle: React.CSSProperties = {
  margin: "0.2rem",
  padding: "0.2rem",
  fontWeight: "bolder",
  fontSize: "0.8rem",
};

const subInfoStyle: React.CSSProperties = {
  height: "10%",
  display: "flex",
  flexDirection: "row",
  gap: "0.5rem",
  alignItems: "center",
  ...titleStyle,
};

const imageStyle: React.CSSProperties = {
  width: "8.5rem",
  height: "12rem",
  borderRadius: "0.5rem",
};

const circleStyle: React.CSSProperties = {
  width: "10px",
  height: "10px",
  borderRadius: "50%",
};

function getColorFromRating(rating: number): string {
  // Ensure rating is between 4 and 10
  rating = Math.max(4, Math.min(rating, 10));

  // Calculate the ratio (0 for red, 1 for green)
  const ratio = (rating - 4) / 6;

  // Interpolate between red (255, 0, 0) and green (0, 255, 0)
  const red = Math.round(255 * (1 - ratio));
  const green = Math.round(255 * ratio);

  // Return the color as an RGB string
  return `rgb(${red}, ${green}, 0)`;
}

function CarouselMovieItem({ movie }: CarouselMovieItemProps) {
  return (
    <Link
      href={`/movie/${movie.id}`}
      style={containerStyle}
      className={styles.thumbnail}
    >
      <div className={styles.imageContainer}>
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          style={imageStyle}
        />
      </div>
      <div style={infoStyle} className={styles.hoverTarget}>
        <div style={titleStyle} className={styles.hoverElement}>
          {movie.title}
        </div>
        <div style={subInfoStyle} className={styles.hoverElement}>
          <div>
            {new Date(movie.release_date).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </div>
          <div>{movie.vote_average.toFixed(2)}</div>
          <div
            style={{
              ...circleStyle,
              backgroundColor: getColorFromRating(movie.vote_average),
            }}
          ></div>
        </div>
      </div>
    </Link>
  );
}

export default CarouselMovieItem;
