import styles from "../../../styles/Header.module.css";

function TVShowsIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={styles.responsiveMenuItemIcon}
    >
      <path d="M4 11v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8H4Z"></path>
      <path d="m4 11-.88-2.87a2 2 0 0 1 1.33-2.5l11.48-3.5a2 2 0 0 1 2.5 1.32l.87 2.87L4 11.01Z"></path>
      <path d="m6.6 4.99 3.38 4.2"></path>
      <path d="m11.86 3.38 3.38 4.2"></path>
    </svg>
  );
}

export default TVShowsIcon;
