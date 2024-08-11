"use client";

import { useState, useRef, useEffect } from "react";
import SearchIcon from "./icons/SearchIcon";
import styles from "../../styles/Header.module.css";
import { searchTMDBMovies } from "@/server/fetchers/tmdb";
import { TMDBMovie } from "@/types";
import SearchResult from "./SearchResult";

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

const searchResultStyle: React.CSSProperties = {
  position: "absolute",
  top: "130%",
  left: 0,
  right: 0,
  display: "flex",
  flexDirection: "column",
  width: "10rem",
  paddingLeft: "10px",
  backgroundColor: "black",
  boxShadow: "0px 1px 2px rgb(163, 164, 167)",
  borderRadius: "8px",
  zIndex: 1,
};

const buttonInputStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
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
    if (isOpen) {
      handleOnSubmit();
    }
    setIsOpen(!isOpen);
  };

  const handleInputClick = (event: React.MouseEvent<HTMLInputElement>) => {
    event.stopPropagation();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleOnSubmit = () => {
    if (!(searchTerm.length > 0)) {
      event?.preventDefault();
      return;
    }

    window.history.pushState(
      {},
      "",
      `/search/${searchTerm.replace(/\s+/g, "-")}`
    );

    //refresh the page
    window.location.reload();
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
            <SearchResult searchResult={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
