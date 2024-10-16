import { TMDBMovie, TMDBTVShow } from "@/types";
import styles from "../styles/Carousel.module.css";
import Link from "next/link";
import MediaImage from "./MediaImage";
import { circleStyle, getColorFromRating } from "./MediaInfo";

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
  margin: "3px",
  padding: "3px",
  fontWeight: "bolder",
  fontSize: "13px",
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
  width: "136px",
  height: "192px",
  borderRadius: "8px",
};

function CarouselItem({ item }: CarouselItemProps) {
  const isMovie = "release_date" in item;

  const title = isMovie ? item.title : item.name;
  const date = isMovie ? item.release_date : item.first_air_date;
  const linkHref = isMovie ? `/movie/${item.id}` : `/tvshow/${item.id}`;

  return (
    <Link href={linkHref} style={containerStyle} className={styles.thumbnail}>
      <div className={styles.imageContainer}>
        <MediaImage
          media={item}
          imageStyle={imageStyle}
          skeletonWidth={135}
          skeletonHeight={195}
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
          {/* Hide rating for unreleased movies and movies with a vote of 0 or 10 */}
          {new Date(date) < new Date() &&
            item.vote_average > 0 &&
            item.vote_average < 10 && (
              <>
                <div>{item.vote_average?.toFixed(2)}</div>
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
