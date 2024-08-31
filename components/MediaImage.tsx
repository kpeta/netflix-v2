"use client";

import { TMDBMovie, TMDBTVShow } from "@/types";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

interface MediaImageProps {
  media: TMDBMovie | TMDBTVShow;
  imageStyle: React.CSSProperties;
  skeletonWidth: number;
  skeletonHeight: number;
}

function MediaImage({
  media,
  imageStyle,
  skeletonWidth,
  skeletonHeight,
}: MediaImageProps) {
  const isMovie = "release_date" in media;
  const title = isMovie ? media.title : media.name;

  const [imageError, setImageError] = useState(false);

  // reset imageError state when media prop changes
  useEffect(() => {
    setImageError(false);
  }, [media]);

  return (
    <>
      {imageError || !media.poster_path ? (
        <Skeleton
          width={skeletonWidth}
          height={skeletonHeight}
          style={{ filter: "invert(1)" }}
        />
      ) : (
        !imageError && (
          <img
            src={`https://image.tmdb.org/t/p/w500/${media.poster_path}`}
            alt={title}
            style={imageStyle}
            onError={() => setImageError(true)}
          />
        )
      )}
    </>
  );
}

export default MediaImage;
