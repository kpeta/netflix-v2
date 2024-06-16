import { searchTMDBMovies } from "@/server/fetchers/tmdb";
import { TMDBMovie } from "@/types";
import styles from "../../../styles/Header.module.css";
import Link from "next/link";

const searchResultStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: "20px",
  marginBottom: "20px",
  cursor: "pointer",
  textDecoration: "none",
  color: "white",
  backgroundColor: "rgb(13, 11, 11)",
  borderRadius: "14px",
};

const searchResultImageStyle: React.CSSProperties = {
  width: "100px",
  height: "150px",
};

async function Page({ params }: { params: { term: string } }) {
  const movies: TMDBMovie[] = await searchTMDBMovies(params.term);

  if (movies.length === 0) {
    return (
      <div style={{ color: "white" }}>
        <h2>No movies found.</h2>
      </div>
    );
  }

  return (
    <div style={{ color: "white" }}>
      <h1>Search Results</h1>
      {movies.map((movie: TMDBMovie) => (
        <Link
          href={`/movie/${movie.id}`}
          key={movie.id}
          style={searchResultStyle}
          className={styles.netflixLogoImage}
        >
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
            style={searchResultImageStyle}
          />
          <div>
            <h2>{movie.title}</h2>
            <p>Rating: {movie.vote_average}</p>
            <p>Release Date: {movie.release_date}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Page;
