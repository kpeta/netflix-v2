import Carousel from "@/components/Carousel";
import CarouselItem from "@/components/CarouselItem";
import MainPageBackground from "@/components/MainPageBackground";
import MovieInfoButton from "@/components/MovieInfoButton";
import MovieInfoCard from "@/components/MovieInfoCard";
import {
  getTMDBContentDetails,
  getTMDBContentTrailers,
  getTMDBData,
} from "@/server/fetchers/tmdb";
import { TMDBMovie } from "@/types";

export const revalidate = 60 * 60 * 24 * 7; // fetch movies once a week

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
  marginTop: "35px",
};

export default async function Home() {
  const trendingMovies = await getTMDBData({
    type: "movie",
    category: "trending",
  });
  const randomTrendingMovie = await getTMDBContentDetails(
    trendingMovies[Math.floor(Math.random() * trendingMovies.length)].id,
    "movie"
  );
  trendingMovies[Math.floor(Math.random() * trendingMovies.length)];
  const randomTrendingMovieTrailerID = (
    await getTMDBContentTrailers(randomTrendingMovie.id, "movie")
  )[0].key;

  const topRatedMovies = await getTMDBData({
    type: "movie",
    category: "top_rated",
  });

  const upcomingMovies = await getTMDBData({
    type: "movie",
    category: "upcoming",
  });

  const trendingTVShows = await getTMDBData({
    type: "tv",
    category: "trending",
  });

  const topRatedTVShows = await getTMDBData({
    type: "tv",
    category: "top_rated",
  });

  const upcomingTVShows = await getTMDBData({
    type: "tv",
    category: "upcoming",
  });

  return (
    <main style={mainStyle}>
      <MainPageBackground
        movie={randomTrendingMovie as TMDBMovie}
        movieTrailerID={randomTrendingMovieTrailerID}
      />

      <div style={pageContainer(11)}>
        <MovieInfoCard movie={randomTrendingMovie as TMDBMovie} />
        <MovieInfoButton movie={randomTrendingMovie as TMDBMovie} />

        <div style={{ marginTop: "75px" }} />

        <div style={carouselTitleStyle}>Trending Movies</div>
        <Carousel
          items={trendingMovies.map((movie) => (
            <CarouselItem key={movie.id} item={movie} />
          ))}
        />

        <div style={carouselTitleStyle}>Top Rated Movies</div>
        <Carousel
          items={topRatedMovies.map((movie) => (
            <CarouselItem key={movie.id} item={movie} />
          ))}
        />

        <div style={carouselTitleStyle}>Upcoming Movies</div>
        <Carousel
          items={upcomingMovies.map((movie) => (
            <CarouselItem key={movie.id} item={movie} />
          ))}
        />

        <div style={carouselTitleStyle}>Trending TV Shows</div>
        <Carousel
          items={trendingTVShows.map((tvshow) => (
            <CarouselItem key={tvshow.id} item={tvshow} />
          ))}
        />

        <div style={carouselTitleStyle}>Top Rated TV Shows</div>
        <Carousel
          items={topRatedTVShows.map((tvshow) => (
            <CarouselItem key={tvshow.id} item={tvshow} />
          ))}
        />

        <div style={carouselTitleStyle}>Upcoming TV Shows</div>
        <Carousel
          items={upcomingTVShows.map((tvshow) => (
            <CarouselItem key={tvshow.id} item={tvshow} />
          ))}
        />

        <div style={{ marginBottom: "75px" }} />
      </div>
    </main>
  );
}
