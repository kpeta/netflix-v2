import MainPageBackground from "@/components/MainPageBackground";
import { getTMDBContentDetails, getTMDBData } from "@/server/fetchers/tmdb";
import { pageContainer } from "../page";
import Carousel from "@/components/Carousel";
import CarouselItem from "@/components/CarouselItem";

const carouselTitleStyle: React.CSSProperties = {
  fontSize: "20px",
  fontWeight: 900,
  marginTop: "35px",
};

async function Page() {
  const topRatedTVShows = await getTMDBData({
    type: "tv",
    category: "top_rated",
  });
  const randomTopRatedTVShow = await getTMDBContentDetails(
    topRatedTVShows[Math.floor(Math.random() * topRatedTVShows.length)].id,
    "tv"
  );

  const actionTVShows = await getTMDBData({
    type: "tv",
    category: "genre",
    genre: "action",
  });

  const comedyTVShows = await getTMDBData({
    type: "tv",
    category: "genre",
    genre: "comedy",
  });

  const scaryTVShows = await getTMDBData({
    type: "tv",
    category: "genre",
    genre: "scary",
  });

  const romanceTVShows = await getTMDBData({
    type: "tv",
    category: "genre",
    genre: "romance",
  });

  const documentaries = await getTMDBData({
    type: "tv",
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
        backgroundMedia={randomTopRatedTVShow}
        backgroundTrailerEnabled={false}
      />

      <div style={pageContainer(8)}>
        <div style={carouselTitleStyle}>Top Rated TV Shows</div>
        <Carousel
          items={topRatedTVShows.map((tvshow) => (
            <CarouselItem key={tvshow.id} item={tvshow} />
          ))}
        />

        <div style={carouselTitleStyle}>Action TV Shows</div>
        <Carousel
          items={actionTVShows.map((tvshow) => (
            <CarouselItem key={tvshow.id} item={tvshow} />
          ))}
        />

        <div style={carouselTitleStyle}>Comedy TV Shows</div>
        <Carousel
          items={comedyTVShows.map((tvshow) => (
            <CarouselItem key={tvshow.id} item={tvshow} />
          ))}
        />

        <div style={carouselTitleStyle}>Scary TV Shows</div>
        <Carousel
          items={scaryTVShows.map((tvshow) => (
            <CarouselItem key={tvshow.id} item={tvshow} />
          ))}
        />

        <div style={carouselTitleStyle}>Romance TV Shows</div>
        <Carousel
          items={romanceTVShows.map((tvshow) => (
            <CarouselItem key={tvshow.id} item={tvshow} />
          ))}
        />

        <div style={carouselTitleStyle}>Documentaries</div>
        <Carousel
          items={documentaries.map((tvshow) => (
            <CarouselItem key={tvshow.id} item={tvshow} />
          ))}
        />
      </div>
    </div>
  );
}

export default Page;
