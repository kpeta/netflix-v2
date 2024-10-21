"use client";

import React, { useState, useRef, useEffect, ReactNode } from "react";
import styles from "../styles/Carousel.module.css";

const TOLERANCE_FACTOR_PX = 3; // tolerance factor to account for rounding errors
const BACKGROUND_COLOR_CHANGE_INTERVAL_MS = 1000;

interface CarouselProps {
  items: ReactNode[];
}

const carouselOuterContainerStyle: React.CSSProperties = {
  position: "relative",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const carouselContainerBaseStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  overflowX: "scroll",
  msOverflowStyle: "none", // IE and Edge
  scrollbarWidth: "none",
  width: "100%",
  borderRadius: "8px",
  backgroundColor: "rgb(23,23,23)", // base color (initial)
  transition: "background-color 3s ease", // smooth transition
};

const carouselItemsContainerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  width: "100%",
};

const carouselItemStyle: React.CSSProperties = {
  boxSizing: "border-box", // padding and border are included in the width
  padding: "7px",
};

const buttonStyle: React.CSSProperties = {
  position: "absolute",
  border: "none",
  backgroundColor: "black",
  color: "white",
  cursor: "pointer",
  padding: "8px",
  height: "100%",
  zIndex: 1,
  borderRadius: "8px",
};

const prevButtonStyle: React.CSSProperties = {
  ...buttonStyle,
  left: 0,
};

const nextButtonStyle: React.CSSProperties = {
  ...buttonStyle,
  right: 0,
};

const disabledButtonStyle: React.CSSProperties = {
  display: "none",
};

function Carousel({ items }: CarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);
  const [itemWidth, setItemWidth] = useState(0);
  const [prevButtonVisible, setPrevButtonVisible] = useState(false);
  const [nextButtonVisible, setNextButtonVisible] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("rgb(23,23,23)");

  // cycle through colors every BACKGROUND_COLOR_CHANGE_INTERVAL_MS
  useEffect(() => {
    const colors = ["rgb(23,23,23)", "rgb(55,55,55)"];

    const changeBackgroundColor = () => {
      setBackgroundColor((prevColor) => {
        const currentIndex = colors.indexOf(prevColor);
        const nextIndex = (currentIndex + 1) % colors.length;
        return colors[nextIndex];
      });
    };

    const intervalId = setInterval(
      changeBackgroundColor,
      BACKGROUND_COLOR_CHANGE_INTERVAL_MS
    );

    return () => {
      clearInterval(intervalId); // cleanup on unmount
    };
  }, []);

  // Calculate carousel item width on mount and resize
  useEffect(() => {
    const calculateItemWidth = () => {
      if (itemRef.current) {
        setItemWidth(itemRef.current.offsetWidth);
      }
    };

    calculateItemWidth();
    window.addEventListener("resize", calculateItemWidth);

    // Remove event listener on unmount
    return () => {
      window.removeEventListener("resize", calculateItemWidth);
    };
  }, []);

  // Update button visibility based on scroll position
  useEffect(() => {
    const container = containerRef.current; // Capture the ref value (eslint)

    const handleScroll = () => {
      if (container) {
        const { scrollLeft, scrollWidth, clientWidth } = container;

        // Calculate whether buttons should be visible
        setPrevButtonVisible(scrollLeft > 0);
        setNextButtonVisible(
          scrollLeft < scrollWidth - clientWidth - TOLERANCE_FACTOR_PX
        );
      }
    };

    handleScroll(); // Initial check
    container?.addEventListener("scroll", handleScroll);

    return () => {
      container?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handlePrev = () => {
    containerRef.current?.scrollBy({ left: -itemWidth, behavior: "smooth" });
  };

  const handleNext = () => {
    containerRef.current?.scrollBy({ left: itemWidth, behavior: "smooth" });
  };

  return (
    <div style={carouselOuterContainerStyle} className={styles.hoverTarget}>
      <button
        style={prevButtonVisible ? prevButtonStyle : disabledButtonStyle}
        className={styles.hoverElement}
        onClick={handlePrev}
      >
        {"<"}
      </button>
      <div
        style={{ ...carouselContainerBaseStyle, backgroundColor }} // Apply dynamic background color
        ref={containerRef}
      >
        <div style={carouselItemsContainerStyle}>
          {items.map((item, index) => (
            <div key={index} style={carouselItemStyle} ref={itemRef}>
              {item}
            </div>
          ))}
        </div>
      </div>
      <button
        style={nextButtonVisible ? nextButtonStyle : disabledButtonStyle}
        className={styles.hoverElement}
        onClick={handleNext}
      >
        {">"}
      </button>
    </div>
  );
}

export default Carousel;
