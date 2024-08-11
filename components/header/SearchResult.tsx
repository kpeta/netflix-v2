"use client";

import { TMDBMovie } from "@/types";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "../../styles/Header.module.css";

interface SearchResultsProps {
  searchResult: TMDBMovie;
}

const searchResultsButtonStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  backgroundColor: "transparent",
  border: "none",
  width: "100%",
  textDecoration: "none",
};

const searchResultItemStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "15px",
  color: "rgb(224, 232, 241)",
  fontFamily: "inherit",
  fontSize: "0.8rem",
  cursor: "pointer",
  width: "100%",
  textAlign: "center",
};

const movieThumbnailStyle: React.CSSProperties = {
  width: "80px",
  height: "50px",
  cursor: "pointer",
  marginBottom: "0.5rem",
};

function SearchResult({ searchResult }: SearchResultsProps) {
  const [imageError, setImageError] = useState(false);

  // Reset imageError state when searchResult prop changes
  useEffect(() => {
    setImageError(false);
  }, [searchResult]);

  return (
    <>
      <Link
        href={`/movie/${searchResult.id}`}
        key={searchResult.id}
        style={searchResultsButtonStyle}
        className={styles.netflixLogoImage}
      >
        {imageError ? (
          <Skeleton width={50} height={40} style={{ filter: "invert(1)" }} />
        ) : (
          !imageError && (
            <img
              src={`https://image.tmdb.org/t/p/w500/${searchResult.poster_path}`}
              alt={searchResult.title}
              style={movieThumbnailStyle}
              onError={() => setImageError(true)}
            />
          )
        )}
        <div style={searchResultItemStyle}>
          {searchResult.title} (
          {new Date(searchResult.release_date).getFullYear()})
        </div>
      </Link>
    </>
  );
}

export default SearchResult;
