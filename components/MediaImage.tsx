import { TMDBMovie, TMDBTVShow } from "@/types";
import Skeleton from "react-loading-skeleton";

const DEFAULT_IMAGE_QUALITY = "w500";

interface MediaImageProps {
  media: TMDBMovie | TMDBTVShow;
  imageStyle: React.CSSProperties;
  skeletonWidth: number;
  skeletonHeight: number;
  quality?: "w500" | "original";
}

export default async function MediaImage({
  media,
  imageStyle,
  skeletonWidth,
  skeletonHeight,
  quality = DEFAULT_IMAGE_QUALITY,
}: MediaImageProps) {
  const isMovie = "release_date" in media;
  const title = isMovie ? media.title : media.name;

  if (!media.poster_path) {
    return (
      <Skeleton
        width={skeletonWidth}
        height={skeletonHeight}
        style={{ filter: "invert(1)" }}
      />
    );
  }

  return (
    <img
      src={`https://image.tmdb.org/t/p/${quality}/${media.poster_path}`}
      alt={title}
      style={imageStyle}
    />
  );
}
