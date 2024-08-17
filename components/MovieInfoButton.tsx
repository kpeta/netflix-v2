import { TMDBMovie } from "@/types";
import styles from "../styles/MovieInfoCard.module.css";
import InfoIcon from "@/components/icons/InfoIcon";
import Link from "next/link";

interface MovieInfoButtonProps {
  movie: TMDBMovie;
}

function MovieInfoButton({ movie }: MovieInfoButtonProps) {
  return (
    <Link href={`/movie/${movie.id}`} className={styles.button}>
      <div>
        <InfoIcon />
      </div>
      <div>More Info</div>
    </Link>
  );
}

export default MovieInfoButton;
