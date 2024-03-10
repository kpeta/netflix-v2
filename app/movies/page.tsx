import { getTMDBPopularMovies } from "@/server/fetchers/tmdb";
import { TMDBMovie } from "@/types";
import Link from "next/link";

export const revalidate = 60 * 60 * 24 * 7; // fetch movies once in a week

async function MoviesPage() {
  const movies = await getTMDBPopularMovies();

  return (
    <div>
      <h1>Popular Movies</h1>
      <ul>
        {movies.map((movie: TMDBMovie) => (
          <li key={movie.id} style={{ marginBottom: 15 }}>
            <button>
              <Link href={`/movie/${movie.id}`}>Go to {movie.title}</Link>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MoviesPage;
