import Carousel from "@/components/Carousel";
import CarouselMovieItem from "@/components/CarouselMovieItem";
import { getToken } from "@/server/auth";
import { getTMDBPopularMovies } from "@/server/fetchers/tmdb";
import Link from "next/link";

export const revalidate = 60 * 60 * 24 * 7; // fetch movies once a day

export default async function Home() {
  const token = await getToken();
  const movies = await getTMDBPopularMovies();

  return (
    <main
      style={{
        backgroundColor: "blue",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        justifyContent: "center",
        alignItems: "center",
        width: "50%",
      }}
    >
      <h1>Home Page</h1>
      <Carousel
        items={movies.map((movie) => (
          <CarouselMovieItem key={movie.id} movie={movie} />
        ))}
      />

      <button>
        <Link href="/data">Go to data page</Link>
      </button>
      <button>
        <Link href="/form">Go to form page</Link>
      </button>
      <button>
        <Link href="/movies">Go to movies page</Link>
      </button>
      <pre>{JSON.stringify(token, null, 2)}</pre>
    </main>
  );
}
