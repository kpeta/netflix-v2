import MediaImage from "@/components/MediaImage";
import {
  getTMDBContentDetails,
  getTMDBContentTrailers,
} from "@/server/fetchers/tmdb";
import { TMDBMovie, TMDBVideo } from "@/types";

const thumbnailStyle: React.CSSProperties = {
  width: "250px",
  height: "400px",
  marginBottom: "0.5rem",
};

async function Page({ params }: { params: { id: string } }) {
  const movie = (await getTMDBContentDetails(
    parseInt(params.id),
    "movie"
  )) as TMDBMovie;
  if (!movie) {
    return <div>Movie not found</div>;
  }

  const trailers: TMDBVideo[] = await getTMDBContentTrailers(
    parseInt(params.id),
    "movie"
  );

  return (
    <div style={{ color: "white" }}>
      <div>
        <h1>{movie.title}</h1>
        <p>{movie.overview}</p>
        <p>Rating: {movie.vote_average}</p>
        <p>Release Date: {movie.release_date}</p>

        <MediaImage
          media={movie}
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
