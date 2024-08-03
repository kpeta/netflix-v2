"use client";

import React, { useState, useRef, useEffect, ReactNode } from "react";
import styles from "../styles/Carousel.module.css";

interface CarouselProps {
  items: ReactNode[];
}

const carouselOuterContainerStyle: React.CSSProperties = {
  position: "relative",
  width: "70%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const carouselContainerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
  width: "100%",
  backgroundColor: "black",
  borderRadius: "0.5rem",
};

const carouselItemsContainerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  transition: "transform 0.5s ease",
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
  const [visibleItemsCount, setVisibleItemsCount] = useState(5);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [itemWidth, setItemWidth] = useState(0);

  useEffect(() => {
    const calculateVisibleItemsCount = () => {
      if (containerRef.current && itemRef.current) {
        setItemWidth(itemRef.current.offsetWidth);
        const visibleCount =
          containerRef.current.offsetWidth / itemRef.current.offsetWidth;
        setVisibleItemsCount(visibleCount);
      }
    };

    calculateVisibleItemsCount();
    window.addEventListener("resize", calculateVisibleItemsCount);
    return () => {
      window.removeEventListener("resize", calculateVisibleItemsCount);
    };
  }, []);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < items.length - visibleItemsCount) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <div style={carouselOuterContainerStyle} className={styles.hoverTarget}>
      <button
        style={currentIndex === 0 ? disabledButtonStyle : prevButtonStyle}
        className={styles.hoverElement}
        onClick={handlePrev}
      >
        {"<"}
      </button>
      <div style={carouselContainerStyle} ref={containerRef}>
        <div
          style={{
            ...carouselItemsContainerStyle,
            transform: `translateX(-${currentIndex * itemWidth}px)`,
          }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              style={{ ...carouselItemStyle, flex: `0 0 ${itemWidth}px` }}
              ref={itemRef}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
      <button
        style={
          currentIndex >= items.length - visibleItemsCount
            ? disabledButtonStyle
            : nextButtonStyle
        }
        className={styles.hoverElement}
        onClick={handleNext}
      >
        {">"}
      </button>
    </div>
  );
}

export default Carousel;
