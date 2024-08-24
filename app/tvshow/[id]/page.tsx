import {
  getTMDBContentDetails,
  getTMDBContentTrailers,
} from "@/server/fetchers/tmdb";
import { TMDBTVShow, TMDBVideo } from "@/types";

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

        <img
          src={`https://image.tmdb.org/t/p/w500/${tvShow.poster_path}`}
          alt={tvShow.name}
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
