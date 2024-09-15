"use client";

import { TMDBMovie, TMDBTVShow } from "@/types";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

const DEFAULT_IMAGE_QUALITY = "w500";

interface MediaImageProps {
  media: TMDBMovie | TMDBTVShow;
  imageStyle: React.CSSProperties;
  skeletonWidth: number;
  skeletonHeight: number;
  quality?: "w500" | "original";
}

function MediaImage({
  media,
  imageStyle,
  skeletonWidth,
  skeletonHeight,
  quality = DEFAULT_IMAGE_QUALITY,
}: MediaImageProps) {
  const isMovie = "release_date" in media;
  const title = isMovie ? media.title : media.name;

  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setImageLoaded(false);
    setImageError(false);

    if (media.poster_path) {
      const img = new Image();
      img.src = `https://image.tmdb.org/t/p/${quality}/${media.poster_path}`;
      img.onload = () => {
        setImageLoaded(true);
      };
      img.onerror = () => {
        setImageError(true);
      };
    }
  }, [media, quality]);

  return (
    <>
      {imageError || !imageLoaded || !media.poster_path ? (
        <Skeleton
          width={skeletonWidth}
          height={skeletonHeight}
          style={{ filter: "invert(1)" }}
        />
      ) : (
        <img
          src={`https://image.tmdb.org/t/p/${quality}/${media.poster_path}`}
          alt={title}
          style={imageStyle}
        />
      )}
    </>
  );
}

export default MediaImage;
