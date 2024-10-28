"use client";

import { TMDBMovie, TMDBTVShow } from "@/types";
import styles from "../styles/MainPage.module.css";
import { useEffect, useState } from "react";
import MediaImage from "./MediaImage";

// layout structure:
// mainPageContainer -> position: relative
// 	mainPageBackgroundContainer -> position: "absolute", top: 0

// 	shadowTop -> position: "absolute", top: 0

// 	backgroundVideoContainer -> position: "relative"
// 		video -> position: "absolute", top: 0
// 		shadowBottom -> position: "absolute", bottom: 0

// 	backgroundImageContainer -> position: "relative"
// 		shadowTop -> position: "absolute", top: 0
// 		image -> position: "absolute", top: 0

// 	shadowBottom -> position: "absolute", bottom: 0

interface MainPageBackgroundProps {
  backgroundMedia: TMDBMovie | TMDBTVShow;
  backgroundMediaTrailerID?: string;
  backgroundTrailerEnabled?: boolean;
}

const containerStyle: React.CSSProperties = {
  position: "absolute",
  top: 0,
  width: "100%",
  height: "100%",
  overflow: "hidden",
  zIndex: -1,
};

const backgroundVideoContainerStyle: React.CSSProperties = {
  position: "relative",
  width: "100%",
  pointerEvents: "none",
  zIndex: -1,
  opacity: 0.55,
  overflow: "hidden",
  aspectRatio: "16/9",
};

const iframeVideoStyle: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "300%",
  height: "100%",
  marginLeft: "-100%",
  border: "none",
};

const backgroundImageContainerStyle: React.CSSProperties = {
  position: "relative",
  width: "100%",
  zIndex: -1,
};

const backgroundImageStyle: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "auto",
  opacity: 0.3,
  zIndex: -1,
};

const shadowTopStyle: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  background:
    "linear-gradient(to bottom, rgba(23, 23, 23, 1) 20%, rgba(23, 23, 23, 0) 100%)",
  zIndex: 0,
};

const shadowBottomStyle: React.CSSProperties = {
  position: "absolute",
  bottom: 0,
  left: 0,
  width: "100%",
  background:
    "linear-gradient(to top, rgba(23, 23, 23, 1) 50%, rgba(23, 23, 23, 0) 100%)",
  zIndex: 0,
};

function MainPageBackground({
  backgroundMedia,
  backgroundMediaTrailerID,
  backgroundTrailerEnabled = true,
}: MainPageBackgroundProps) {
  const [windowHeight, setWindowHeight] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
    }
  }, []);

  return (
    <div style={containerStyle}>
      <div style={shadowTopStyle} className={styles.shadowTopHeight} />

      {backgroundTrailerEnabled && backgroundMediaTrailerID && (
        <div style={backgroundVideoContainerStyle}>
          <iframe
            style={iframeVideoStyle}
            className={styles.backgroundVideo}
            src={`https://www.youtube.com/embed/${backgroundMediaTrailerID}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&modestbranding=0&rel=0&playsinline=1&enablejsapi=1&playlist=${backgroundMediaTrailerID}`}
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="Background Video"
          />
          <div
            style={shadowBottomStyle}
            className={styles.shadowBottomHeight}
          />
        </div>
      )}

      <div
        style={backgroundImageContainerStyle}
        className={styles.backgroundVideo} // counteract the iframe's negative margin to remove the gap
      >
        <div style={shadowTopStyle} className={styles.shadowTopHeight} />
        <MediaImage
          imageStyle={backgroundImageStyle}
          media={backgroundMedia}
          skeletonHeight={windowHeight}
          skeletonWidth={windowWidth}
          quality="original"
        />
      </div>

      <div style={shadowBottomStyle} className={styles.shadowBottomHeight} />
    </div>
  );
}

export default MainPageBackground;
