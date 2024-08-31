import MediaImage from "@/components/MediaImage";
import {
  getTMDBContentDetails,
  getTMDBContentTrailers,
} from "@/server/fetchers/tmdb";
import { TMDBTVShow, TMDBVideo } from "@/types";

const thumbnailStyle: React.CSSProperties = {
  width: "250px",
  height: "400px",
  marginBottom: "0.5rem",
};

async function Page({ params }: { params: { id: string } }) {
  const tvShow = (await getTMDBContentDetails(
    parseInt(params.id),
    "tv"
  )) as TMDBTVShow;
  if (!tvShow) {
    return <div>TV Show not found</div>;
  }

  const trailers: TMDBVideo[] = await getTMDBContentTrailers(
    parseInt(params.id),
    "tv"
  );

  return (
    <div style={{ color: "white" }}>
      <div>
        <h1>{tvShow.name}</h1>
        <p>{tvShow.overview}</p>
        <p>Rating: {tvShow.vote_average}</p>
        <p>First Air Date: {tvShow.first_air_date}</p>
        <p>Seasons: {tvShow.number_of_seasons}</p>
        <p>Episodes: {tvShow.number_of_episodes}</p>

        <MediaImage
          media={tvShow}
          imageStyle={thumbnailStyle}
          skeletonWidth={250}
          skeletonHeight={400}
        />
      </div>

      <div>
        {trailers.length > 0 ? (
          <div>
            <h2>Trailer</h2>
            <iframe
              src={`https://www.youtube.com/embed/${trailers[0].key}`}
              width={640}
              height={360}
              allowFullScreen
            />
          </div>
        ) : (
          <div>
            <h2>No Trailer Found</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
