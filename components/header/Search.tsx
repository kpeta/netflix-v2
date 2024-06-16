"use client";

import { useState, useRef, useEffect } from "react";
import SearchIcon from "./SearchIcon";
import styles from "../../styles/Header.module.css";
import { searchTMDBMovies } from "@/server/fetchers/tmdb";
import { TMDBMovie } from "@/types";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";

const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "1px",
  position: "relative",
};

const searchIconButtonStyle: React.CSSProperties = {
  backgroundColor: "transparent",
  border: "none",
};

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

const searchResultStyle: React.CSSProperties = {
  position: "absolute",
  top: "100%",
  left: 0,
  right: 0,
  paddingLeft: "10px",
  backgroundColor: "black",
  boxShadow: "0px 1px 2px rgb(163, 164, 167)",
  borderRadius: "8px",
  zIndex: 1,
};

const searchResultItemStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "15px",
  color: "rgb(224, 232, 241)",
  fontFamily: "inherit",
  fontSize: "14px",
  cursor: "pointer",
  width: "100%",
  textAlign: "center",
};

const buttonInputStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const movieThumbnailStyle: React.CSSProperties = {
  width: "80px",
  height: "50px",
  cursor: "pointer",
};

export default function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<TMDBMovie[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        buttonRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm(""); // clearing the input field when clicking outside
        setSearchResults([]); // clearing the search results when clicking outside
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    (async () => {
      if (searchTerm) {
        try {
          const data = await searchTMDBMovies(searchTerm);
          setSearchResults(data.slice(0, 3));
        } catch (error) {
          console.error("Failed to fetch movies:", error);
        }
      } else {
        setSearchResults([]);
      }
    })();
  }, [searchTerm]);

  const handleIconClick = () => {
    setIsOpen(!isOpen);
    setSearchTerm(""); // clear the search term when opening or closing the input field
  };

  const handleInputClick = (event: React.MouseEvent<HTMLInputElement>) => {
    event.stopPropagation();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleOnSubmit = () => {
    window.history.pushState(
      {},
      "",
      `/search/${searchTerm.replace(/\s+/g, "-")}`
    );
  };

  return (
    <div style={containerStyle}>
      <div style={buttonInputStyle}>
        <button
          ref={buttonRef}
          style={searchIconButtonStyle}
          onClick={handleIconClick}
        >
          <SearchIcon />
        </button>
        <form onSubmit={handleOnSubmit}>
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            className={isOpen ? styles.searchInputOpen : styles.searchInput}
            placeholder="Search..."
            onClick={handleInputClick}
          />
        </form>
      </div>
      {isOpen && searchResults.length > 0 && (
        <div style={searchResultStyle}>
          {searchResults.map((movie) => (
            <Link
              href={`/movie/${movie.id}`}
              key={movie.id}
              style={searchResultsButtonStyle}
              className={styles.netflixLogoImage}
            >
              <img
                key={uuidv4()}
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                style={movieThumbnailStyle}
              />

              <div key={uuidv4()} style={searchResultItemStyle}>
                {movie.title} ({new Date(movie.release_date).getFullYear()})
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
