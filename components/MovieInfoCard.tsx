import { TMDBMovie } from "../types";
import { circleStyle, getColorFromRating } from "./CarouselMovieItem";
import styles from "../styles/MovieInfoCard.module.css";
import React from "react";

interface MovieInfoCardProps {
  movie: TMDBMovie;
}

const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  width: "100%",
};

const titleStyle: React.CSSProperties = {
  fontWeight: 900,
};

const ratingContainerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  gap: "10px",
  alignItems: "center",
  fontWeight: 900,
};

const releaseDateStyle: React.CSSProperties = {
  whiteSpace: "nowrap",
  color: "lightgray",
};

const overviewStyle: React.CSSProperties = {
  color: "lightgray",
};

function MovieInfoCard({ movie }: MovieInfoCardProps) {
  return (
    <div style={containerStyle}>
      <div style={titleStyle} className={styles.title}>
        {movie.title}
      </div>

      <div style={ratingContainerStyle} className={styles.rating}>
        <div style={{ color: getColorFromRating(movie.vote_average) }}>
          {movie.vote_average.toFixed(2)}
        </div>
        <div
          style={{
            ...circleStyle,
            backgroundColor: getColorFromRating(movie.vote_average),
          }}
        ></div>
        <div style={releaseDateStyle}>
          {new Date(movie.release_date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </div>
      </div>

      <div style={overviewStyle} className={styles.rating}>
        {movie.overview}
      </div>
    </div>
  );
}

export default MovieInfoCard;
