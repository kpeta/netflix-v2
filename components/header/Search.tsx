"use client";

import { useState, useRef, useEffect } from "react";
import SearchIcon from "./SearchIcon";
import styles from "../../styles/Header.module.css";

const containerStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "1px",
  position: "relative",
  marginRight: "10px",
};

const searchIconButtonStyle: React.CSSProperties = {
  backgroundColor: "transparent",
  border: "none",
  position: "absolute",
};

function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
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
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

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

  return (
    <div style={containerStyle}>
      <button
        ref={buttonRef}
        style={searchIconButtonStyle}
        onClick={handleIconClick}
      >
        <SearchIcon />
      </button>
      <input
        ref={inputRef}
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        className={isOpen ? styles.searchInputOpen : styles.searchInput}
        placeholder="Search..."
        style={{ paddingLeft: isOpen ? "40px" : "10px" }}
        onClick={handleInputClick}
      />
    </div>
  );
}

export default Search;
