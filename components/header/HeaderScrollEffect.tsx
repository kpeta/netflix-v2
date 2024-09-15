"use client";

import { useEffect } from "react";
import styles from "../../styles/Header.module.css";

function HeaderScrollEffect() {
  const handleScroll = () => {
    const header = document.querySelector(`.${styles.header}`);
    if (window.scrollY > 50) {
      header?.classList.add(styles.scrolled);
    } else {
      header?.classList.remove(styles.scrolled);
    }
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return null; // No visible UI, just handles the scroll logic
}

export default HeaderScrollEffect;
