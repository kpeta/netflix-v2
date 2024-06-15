import {
  getTMDBMovieDetails,
  getTMDBMovieTrailers,
} from "@/server/fetchers/tmdb";
import { TMDBMovie, TMDBVideo } from "@/types";

async function Page({ params }: { params: { id: string } }) {
  const movie: TMDBMovie = await getTMDBMovieDetails(parseInt(params.id));
  if (!movie) {
    return <div>Movie not found</div>;
  }
  const trailers: TMDBVideo[] = await getTMDBMovieTrailers(parseInt(params.id));

  return (
    <div style={{ color: "white" }}>
      <div>
        <h1>{movie.title}</h1>
        <p>{movie.overview}</p>
        <p>Rating: {movie.vote_average}</p>
        <p>Release Date: {movie.release_date}</p>

        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
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
