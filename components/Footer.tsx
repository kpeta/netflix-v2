import Link from "next/link";
import styles from "../styles/Footer.module.css";
import FbIcon from "./icons/FBIcon";
import IGIcon from "./icons/IGIcon";
import TwitterIcon from "./icons/TwitterIcon";
import YTIcon from "./icons/YTIcon";
import React from "react";

const footerItems = [
  "Audio Description",
  "Help Center",
  "Gift Cards",
  "Media Center",
  "Investor Relations",
  "Jobs",
  "Terms of Use",
  "Privacy",
  "Legal Notices",
  "Cookie Preferences",
  "Corporate Information",
  "Contact Us",
];

const footerStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  color: "rgb(152, 149, 149)",
  padding: "10vh 5vw",
};

const footerContentStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  flexDirection: "column",
  fontSize: "14.5px",
};

const socialButtonsContainerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: "15px",
  marginBottom: "20px",
};

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div style={footerContentStyle}>
        <div style={socialButtonsContainerStyle}>
          <Link
            href={"https://www.facebook.com/netflix/"}
            className={styles.socialButton}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FbIcon />
          </Link>
          <Link
            href={"https://www.instagram.com/netflix/"}
            className={styles.socialButton}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IGIcon />
          </Link>
          <Link
            href={"https://x.com/netflix/"}
            className={styles.socialButton}
            target="_blank"
            rel="noopener noreferrer"
          >
            <TwitterIcon />
          </Link>
          <Link
            href={"https://www.youtube.com/@Netflix/"}
            className={styles.socialButton}
            target="_blank"
            rel="noopener noreferrer"
          >
            <YTIcon />
          </Link>
        </div>
        <div className={styles.footerContainer}>
          {footerItems.map((item, index) => (
            <div key={index}>
              <Link href="/" className={styles.footerItem}>
                {item}
              </Link>
            </div>
          ))}
        </div>
        <Link href="https://github.com/kpeta" className={styles.footerItem}>
          © 2024 Netflix Redesigned | kpeta
        </Link>
        <div style={{ marginTop: "5px" }}>
          {process.env.NODE_ENV === "production"
            ? process.env.VERCEL_GIT_COMMIT_SHA?.substring(0, 8)
            : process.env.COMMIT_HASH}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
