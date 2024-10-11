import { TMDBMovie } from "../types";
import MediaInfo from "./MediaInfo";
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

const overviewStyle: React.CSSProperties = {
  color: "lightgray",
};

function MovieInfoCard({ movie }: MovieInfoCardProps) {
  return (
    <div style={containerStyle}>
      <div style={titleStyle} className={styles.title}>
        {movie.title}
      </div>

      <MediaInfo media={movie} />

      <div style={overviewStyle} className={styles.rating}>
        {movie.overview}
      </div>
    </div>
  );
}

export default MovieInfoCard;
