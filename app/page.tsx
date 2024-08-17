import Carousel from "@/components/Carousel";
import CarouselMovieItem from "@/components/CarouselMovieItem";
import MovieInfoButton from "@/components/MovieInfoButton";
import MovieInfoCard from "@/components/MovieInfoCard";
import { getTMDBData } from "@/server/fetchers/tmdb";
import Link from "next/link";

export const revalidate = 60 * 60 * 24 * 7; // fetch movies once a day

export const pageContainer = (topPadding: number = 5): React.CSSProperties => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  paddingRight: "13.5vw",
  paddingLeft: "13.5vw",
  gap: "2vh",
  paddingTop: `${topPadding}rem`,
});

const mainStyle: React.CSSProperties = {
  position: "relative",
  width: "100%",
  height: "100%",
};

const carouselTitleStyle: React.CSSProperties = {
  fontSize: "20px",
  fontWeight: 900,
};

export default async function Home() {
  const trendingMovies = await getTMDBData({
    type: "movie",
    category: "trending",
  });
  const randomTrendingMovie =
    trendingMovies[Math.floor(Math.random() * trendingMovies.length)];

  const topRatedMovies = await getTMDBData({
    type: "movie",
    category: "top_rated",
  });

  const upcomingMovies = await getTMDBData({
    type: "movie",
    category: "upcoming",
  });

  const backgroundImageStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundImage: `
      linear-gradient(to bottom, rgba(0, 0, 0, 0) 10%, rgba(23, 23, 23, 1) 100%),
      url(https://image.tmdb.org/t/p/original/${randomTrendingMovie.poster_path})
    `,
    backgroundSize: "100%",
    backgroundPosition: "top",
    backgroundRepeat: "no-repeat",
    opacity: 0.3,
    zIndex: -1,
  };

  return (
    <main style={mainStyle}>
      <div style={backgroundImageStyle} />
      <div style={pageContainer(11)}>
        <MovieInfoCard movie={randomTrendingMovie} />
        <MovieInfoButton movie={randomTrendingMovie} />

        <div
          style={{
            marginTop: "75px",
            ...carouselTitleStyle,
          }}
        >
          Trending Movies
        </div>
        <Carousel
          items={trendingMovies.map((movie) => (
            <CarouselMovieItem key={movie.id} movie={movie} />
          ))}
        />

        <div
          style={{
            marginTop: "35px",
            ...carouselTitleStyle,
          }}
        >
          Top Rated Movies
        </div>
        <Carousel
          items={topRatedMovies.map((movie) => (
            <CarouselMovieItem key={movie.id} movie={movie} />
          ))}
        />

        <div
          style={{
            marginTop: "35px",
            ...carouselTitleStyle,
          }}
        >
          Upcoming Movies
        </div>
        <Carousel
          items={upcomingMovies.map((movie) => (
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
      </div>
    </main>
  );
}
