"use client";

import React, { useState, useRef, useEffect, ReactNode } from "react";
import styles from "../styles/Carousel.module.css";

const TOLERANCE_FACTOR_PX = 3; // tolerance factor to account for rounding errors

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

const carouselContainerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  overflowX: "scroll",
  msOverflowStyle: "none", // IE and Edge
  scrollbarWidth: "none",
  width: "100%",
  backgroundColor: "rgb(23,23,23)",
  borderRadius: "0.5rem",
};

const carouselItemsContainerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  width: "100%",
};

const carouselItemStyle: React.CSSProperties = {
  boxSizing: "border-box", // padding and border are included in the width
  padding: "0.4rem 0.4rem",
};

const buttonStyle: React.CSSProperties = {
  position: "absolute",
  border: "none",
  backgroundColor: "black",
  color: "white",
  cursor: "pointer",
  padding: "0.5rem",
  height: "100%",
  zIndex: 1,
  borderRadius: "0.5rem",
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

  // Calculate carousel item width on mount and resize
  useEffect(() => {
    const calculateItemWidth = () => {
      if (itemRef.current) {
        setItemWidth(itemRef.current.offsetWidth);
      }
    };

    calculateItemWidth();
    window.addEventListener("resize", calculateItemWidth);

    //when component unmounts, remove event listener
    return () => {
      window.removeEventListener("resize", calculateItemWidth);
    };
  }, []);

  // Update button visibility based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;

        // Calculate whether buttons should be visible
        setPrevButtonVisible(scrollLeft > 0);
        setNextButtonVisible(
          scrollLeft < scrollWidth - clientWidth - TOLERANCE_FACTOR_PX
        );
      }
    };

    handleScroll(); // Initial check
    containerRef.current?.addEventListener("scroll", handleScroll);

    return () => {
      containerRef.current?.removeEventListener("scroll", handleScroll);
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
      <div style={carouselContainerStyle} ref={containerRef}>
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
