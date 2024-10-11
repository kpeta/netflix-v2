import MainPageBackground from "@/components/MainPageBackground";
import { getTMDBContentDetails, getTMDBData } from "@/server/fetchers/tmdb";
import { pageContainer } from "../page";
import Carousel from "@/components/Carousel";
import CarouselItem from "@/components/CarouselItem";

export const revalidate = 60 * 60 * 24 * 7; // fetch movies once in a week

const carouselTitleStyle: React.CSSProperties = {
  fontSize: "20px",
  fontWeight: 900,
  marginTop: "35px",
};

async function MoviesPage() {
  const topRatedMovies = await getTMDBData({
    type: "movie",
    category: "top_rated",
  });
  const randomTopRatedMovie = await getTMDBContentDetails(
    topRatedMovies[Math.floor(Math.random() * topRatedMovies.length)].id,
    "movie"
  );

  const actionMovies = await getTMDBData({
    type: "movie",
    category: "genre",
    genre: "action",
  });

  const comedyMovies = await getTMDBData({
    type: "movie",
    category: "genre",
    genre: "comedy",
  });

  const scaryMovies = await getTMDBData({
    type: "movie",
    category: "genre",
    genre: "scary",
  });

  const romanceMovies = await getTMDBData({
    type: "movie",
    category: "genre",
    genre: "romance",
  });

  const documentaries = await getTMDBData({
    type: "movie",
    category: "genre",
    genre: "documentaries",
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
        backgroundMedia={randomTopRatedMovie}
        backgroundTrailerEnabled={false}
      />

      <div style={pageContainer(8)}>
        <div style={carouselTitleStyle}>Top Rated Movies</div>
        <Carousel
          items={topRatedMovies.map((movie) => (
            <CarouselItem key={movie.id} item={movie} />
          ))}
        />

        <div style={carouselTitleStyle}>Action Movies</div>
        <Carousel
          items={actionMovies.map((movie) => (
            <CarouselItem key={movie.id} item={movie} />
          ))}
        />

        <div style={carouselTitleStyle}>Comedy Movies</div>
        <Carousel
          items={comedyMovies.map((movie) => (
            <CarouselItem key={movie.id} item={movie} />
          ))}
        />

        <div style={carouselTitleStyle}>Scary Movies</div>
        <Carousel
          items={scaryMovies.map((movie) => (
            <CarouselItem key={movie.id} item={movie} />
          ))}
        />

        <div style={carouselTitleStyle}>Romance Movies</div>
        <Carousel
          items={romanceMovies.map((movie) => (
            <CarouselItem key={movie.id} item={movie} />
          ))}
        />

        <div style={carouselTitleStyle}>Documentaries</div>
        <Carousel
          items={documentaries.map((movie) => (
            <CarouselItem key={movie.id} item={movie} />
          ))}
        />
      </div>
    </div>
  );
}

export default MoviesPage;
