import { TMDBMovie, TMDBTVShow } from "../types";
import MediaInfo from "./MediaInfo";
import styles from "../styles/MediaInfoCard.module.css";
import React from "react";

interface MediaInfoCardProps {
  media: TMDBMovie | TMDBTVShow;
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

function MediaInfoCard({ media }: MediaInfoCardProps) {
  const isMovie = "release_date" in media;

  return (
    <div style={containerStyle}>
      <div style={titleStyle} className={styles.title}>
        {isMovie ? (media as TMDBMovie).title : (media as TMDBTVShow).name}
      </div>

      <MediaInfo media={media} />

      <div style={overviewStyle} className={styles.rating}>
        {media.overview}
      </div>
    </div>
  );
}

export default MediaInfoCard;
