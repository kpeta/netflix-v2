import styles from "../styles/MediaInfoCard.module.css";
import Link from "next/link";
import PlayIcon from "./icons/PlayIcon";

interface PlayButtonProps {
  trailerID?: string;
}

function PlayButton({ trailerID }: PlayButtonProps) {
  const linkHref = trailerID
    ? `https://www.youtube.com/watch?v=${trailerID}`
    : "https://www.youtube.com";

  return (
    <Link
      href={linkHref}
      style={{ background: "white", color: "black" }}
      className={styles.button}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div>
        <PlayIcon />
      </div>
      <div>Play</div>
    </Link>
  );
}

export default PlayButton;
