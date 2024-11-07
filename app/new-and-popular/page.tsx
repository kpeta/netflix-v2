import MainPageBackground from "@/components/MainPageBackground";
import { getTMDBContentDetails, getTMDBData } from "@/server/fetchers/tmdb";
import Carousel from "@/components/Carousel";
import CarouselItem from "@/components/CarouselItem";
import { pageContainer } from "@/styles/PageContainer";

const carouselTitleStyle: React.CSSProperties = {
  fontSize: "20px",
  fontWeight: 900,
  marginTop: "35px",
};

async function Page() {
  const trendingMovies = await getTMDBData({
    type: "movie",
    category: "trending",
  });
  const randomTrendingMovie = await getTMDBContentDetails(
    trendingMovies[Math.floor(Math.random() * trendingMovies.length)].id,
    "movie"
  );

  const upcomingMovies = await getTMDBData({
    type: "movie",
    category: "upcoming",
  });

  const trendingTVShows = await getTMDBData({
    type: "tv",
    category: "trending",
  });

  const upcomingTVShows = await getTMDBData({
    type: "tv",
    category: "upcoming",
  });

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      <MainPageBackground
        backgroundMedia={randomTrendingMovie}
        backgroundTrailerEnabled={false}
      />

      <div style={pageContainer(128)}>
        <div style={carouselTitleStyle}>Trending Movies</div>
        <Carousel
          items={trendingMovies.map((movie) => (
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

        <div style={carouselTitleStyle}>Upcoming TV Shows</div>
        <Carousel
          items={upcomingTVShows.map((tvshow) => (
            <CarouselItem key={tvshow.id} item={tvshow} />
          ))}
        />
      </div>
    </div>
  );
}

export default Page;
