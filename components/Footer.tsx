import styles from "../styles/Footer.module.css";

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

const Footer = () => {
  return (
    <footer className={styles.footerContainer}>
      {footerItems.map((item, index) => (
        <div key={index} className={styles.footerItem}>
          {item}
        </div>
      ))}
    </footer>
  );
};

export default Footer;
