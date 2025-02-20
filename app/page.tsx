import Carousel from "@/components/Carousel";
import CarouselItem from "@/components/CarouselItem";
import MainPageBackground from "@/components/MainPageBackground";
import MovieInfoButton from "@/components/MovieInfoButton";
import MediaInfoCard from "@/components/MediaInfoCard";
import {
  getTMDBContentDetails,
  getTMDBContentTrailers,
  getTMDBData,
} from "@/server/fetchers/tmdb";
import { TMDBMovie } from "@/types";
import { pageContainer } from "@/styles/PageContainer";

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
  const trailers = await getTMDBContentTrailers(
    randomTrendingMovie.id,
    "movie"
  );
  const randomTrendingMovieTrailerID = trailers[0]
    ? trailers[0].key
    : undefined; // if no trailers are available, show only movie poster in MainPageBackground

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
        backgroundMedia={randomTrendingMovie}
        backgroundMediaTrailerID={randomTrendingMovieTrailerID}
      />

      <div style={pageContainer(190)}>
        <MediaInfoCard media={randomTrendingMovie as TMDBMovie} />
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
