"use client";

import { useState, useRef, useEffect } from "react";
import SearchIcon from "./icons/SearchIcon";
import styles from "../../styles/Header.module.css";
import { searchTMDBContent } from "@/server/fetchers/tmdb";
import { TMDBMovie, TMDBTVShow } from "@/types";
import SearchResult from "./SearchResult";

const NUMBER_OF_DROPDOWN_SEARCH_RESULTS = 3;
const SEARCH_DEBOUNCE_DELAY_MS = 250;

type SearchResultItem = TMDBMovie | TMDBTVShow;

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
  width: "160px",
  paddingLeft: "10px",
  backgroundColor: "black",
  boxShadow: "0px 1px 2px rgb(163, 164, 167)",
  borderRadius: "8px",
  zIndex: 1,
  overflowY: "scroll",
  overflowX: "hidden",
};

const buttonInputStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const showAllResultsStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "10px",
  border: "none",
  fontSize: "13px",
  color: "rgb(224, 232, 241)",
  backgroundColor: "transparent",
  cursor: "pointer",
};

export default function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResultItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const debounceTimeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        buttonRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchResults([]); // Clearing the search results when clicking outside
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // clear the previous timeout if the user types/deletes quickly
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    // delay the search until the user stops typing for SEARCH_DEBOUNCE_DELAY_MS (to avoid making too many requests)
    debounceTimeoutRef.current = window.setTimeout(async () => {
      if (searchTerm) {
        try {
          const data = await searchTMDBContent(searchTerm);
          setSearchResults(data.slice(0, NUMBER_OF_DROPDOWN_SEARCH_RESULTS));
        } catch (error) {
          console.error("Failed to fetch content:", error);
        }
      } else {
        setSearchResults([]);
      }
    }, SEARCH_DEBOUNCE_DELAY_MS);

    return () => {
      clearTimeout(debounceTimeoutRef.current);
    };
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
            placeholder="Search ↵"
            onClick={handleInputClick}
          />
        </form>
      </div>
      {isOpen && searchTerm && searchResults.length > 0 && (
        <div style={searchResultStyle} className={styles.searchResultHeight}>
          {searchResults.map((item) => (
            <SearchResult searchResult={item} key={item.id} />
          ))}
          <div
            style={{ border: "1px solid rgb(163, 164, 167)", margin: "2px" }}
          />
          <button
            style={showAllResultsStyle}
            className={styles.netflixLogoImage}
            onClick={handleOnSubmit}
          >
            Show All Results
          </button>
        </div>
      )}
    </div>
  );
}
