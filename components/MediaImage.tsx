"use client";

import { TMDBMovie, TMDBTVShow } from "@/types";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500/";

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
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setImageLoaded(false);
    setImageError(false);

    if (media.poster_path) {
      const img = new Image();
      img.src = `${IMAGE_BASE_URL}${media.poster_path}`;
      img.onload = () => {
        setImageLoaded(true);
      };
      img.onerror = () => {
        setImageError(true);
      };
    }
  }, [media]);

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
          src={`${IMAGE_BASE_URL}${media.poster_path}`}
          alt={title}
          style={imageStyle}
        />
      )}
    </>
  );
}

export default MediaImage;
