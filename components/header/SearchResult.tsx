import { TMDBMovie, TMDBTVShow } from "@/types";
import React from "react";
import Link from "next/link";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "../../styles/Header.module.css";
import MediaImage from "../MediaImage";

interface SearchResultsProps {
  searchResult: TMDBMovie | TMDBTVShow;
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
  flexDirection: "column",
  padding: "15px",
  color: "rgb(224, 232, 241)",
  fontFamily: "inherit",
  fontSize: "0.8rem",
  cursor: "pointer",
  width: "100%",
  textAlign: "center",
};

const thumbnailStyle: React.CSSProperties = {
  width: "80px",
  height: "50px",
  cursor: "pointer",
  marginBottom: "0.5rem",
};

const labelStyle: React.CSSProperties = {
  fontSize: "11px",
  marginTop: "3px",
  borderRadius: "20%",
  padding: "1px 2px",
};

function SearchResult({ searchResult }: SearchResultsProps) {
  const isMovie = "release_date" in searchResult;
  const title = isMovie ? searchResult.title : searchResult.name;
  const releaseDate = isMovie
    ? searchResult.release_date
    : searchResult.first_air_date;
  const linkHref = isMovie
    ? `/movie/${searchResult.id}`
    : `/tvshow/${searchResult.id}`;

  return (
    <Link
      href={linkHref}
      key={searchResult.id}
      style={searchResultsButtonStyle}
      className={styles.netflixLogoImage}
    >
      <MediaImage
        media={searchResult}
        imageStyle={thumbnailStyle}
        skeletonWidth={45}
        skeletonHeight={55}
      />
      <div style={searchResultItemStyle}>
        <div>{title}</div>
        <div>({new Date(releaseDate).getFullYear()})</div>
        <div
          style={{
            ...labelStyle,
            color: isMovie ? "purple" : "green",
            border: `1px solid ${isMovie ? "purple" : "green"}`,
          }}
        >
          {isMovie ? "Movie" : "TV Show"}
        </div>
      </div>
    </Link>
  );
}

export default SearchResult;
