import { TMDBMovie, TMDBTVShow } from "@/types";
import styles from "../styles/Carousel.module.css";
import Link from "next/link";

interface CarouselItemProps {
  item: TMDBMovie | TMDBTVShow;
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
  alignItems: "center",
  justifyContent: "space-between",
  ...titleStyle,
};

const imageStyle: React.CSSProperties = {
  width: "8.5rem",
  height: "12rem",
  borderRadius: "0.5rem",
};

export const circleStyle: React.CSSProperties = {
  width: "10px",
  height: "10px",
  borderRadius: "50%",
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

function CarouselItem({ item }: CarouselItemProps) {
  const isMovie = "release_date" in item;

  const title = isMovie ? item.title : item.name;
  const date = isMovie ? item.release_date : item.first_air_date;
  const linkHref = isMovie ? `/movie/${item.id}` : `/tvshow/${item.id}`;

  return (
    <Link href={linkHref} style={containerStyle} className={styles.thumbnail}>
      <div className={styles.imageContainer}>
        <img
          src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
          alt={title}
          style={imageStyle}
        />
      </div>

      <div style={infoStyle} className={styles.hoverTarget}>
        <div style={titleStyle} className={styles.hoverElement}>
          {title}
        </div>
        <div style={subInfoStyle} className={styles.hoverElement}>
          <div style={{ whiteSpace: "nowrap" }}>
            {new Date(date).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </div>
          {/* Hide rating for unreleased movies */}
          {new Date(date) < new Date() && (
            <>
              <div>{item.vote_average.toFixed(2)}</div>
              <div
                style={{
                  ...circleStyle,
                  backgroundColor: getColorFromRating(item.vote_average),
                }}
              ></div>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}

export default CarouselItem;
