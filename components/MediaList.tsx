import styles from "@/styles/MediaList.module.css";
import { TMDBMovie, TMDBTVShow } from "@/types";
import CarouselItem from "./CarouselItem";

interface MediaListProps {
  mediaItems: (TMDBMovie | TMDBTVShow)[];
}

const mainContainerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "35px",
  margin: "0 13.5vw",
};

const titleTextStyle = {
  fontSize: "20px",
  fontWeight: "700",
};

const categoryContainerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};

const MediaList: React.FC<MediaListProps> = ({ mediaItems }) => {
  const movies = mediaItems.filter((item) => "release_date" in item);
  const tvShows = mediaItems.filter((item) => !("release_date" in item));

  const renderCategory = (title: string, items: typeof mediaItems) => (
    <div style={categoryContainerStyle}>
      <div style={titleTextStyle}>{title}</div>
      <div className={styles.itemsContainer}>
        {items.map((item) => (
          <CarouselItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );

  return (
    <div style={mainContainerStyle}>
      {renderCategory("Movies", movies)}
      {renderCategory("Tv Shows", tvShows)}
    </div>
  );
};

export default MediaList;
