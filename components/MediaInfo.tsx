import { TMDBMovie, TMDBTVShow } from "@/types";
import WatchIcon from "./icons/WatchIcon";
import CalendarIcon from "./icons/CalendarIcon";
import styles from "@/styles/MediaPage.module.css";

interface MediaInfoProps {
  media: TMDBMovie | TMDBTVShow;
}
const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  gap: "10px",
  alignItems: "center",
  fontWeight: 900,
};

export const circleStyle: React.CSSProperties = {
  width: "10px",
  height: "10px",
  borderRadius: "50%",
};

const releaseDateStyle: React.CSSProperties = {
  whiteSpace: "nowrap",
  color: "lightgray",
};

const runtimeContainerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  gap: "10px",
  alignItems: "center",
};

export function getColorFromRating(rating: number): string {
  // Ensure rating is between 4 and 10
  rating = Math.max(4, Math.min(rating, 10));

  // Calculate the ratio (0 for red, 1 for green)
  const ratio = (rating - 4) / 6;

  // Interpolate between red (255, 0, 0) and green (0, 255, 0)
  const red = Math.round(255 * (1 - ratio));
  const green = Math.round(255 * ratio);

  return `rgb(${red}, ${green}, 0)`;
}

const MediaInfo = ({ media }: MediaInfoProps) => {
  const isMovie = "release_date" in media;

  return (
    <div style={containerStyle}>
      <div style={{ color: getColorFromRating(media.vote_average) }}>
        {media.vote_average?.toFixed(2)}
      </div>
      <div
        style={{
          ...circleStyle,
          backgroundColor: getColorFromRating(media.vote_average),
        }}
      />
      <div style={releaseDateStyle}>
        {isMovie
          ? new Date((media as TMDBMovie).release_date).toLocaleDateString(
              "en-GB",
              {
                day: "2-digit",
                month: "short",
                year: "numeric",
              }
            )
          : new Date((media as TMDBTVShow).first_air_date).toLocaleDateString(
              "en-GB",
              {
                day: "2-digit",
                month: "short",
                year: "numeric",
              }
            )}
      </div>

      {isMovie ? (
        <div style={runtimeContainerStyle}>
          <WatchIcon />
          <div style={releaseDateStyle}>{(media as TMDBMovie).runtime} min</div>
        </div>
      ) : (
        <div style={runtimeContainerStyle}>
          <CalendarIcon />
          Seasons: {(media as TMDBTVShow).number_of_seasons}
          <div className={styles.epsiodesContainer}>
            <div style={{ ...circleStyle, backgroundColor: "lightgray" }} />
            Episodes: {(media as TMDBTVShow).number_of_episodes}
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaInfo;
