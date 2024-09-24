import { pageContainer } from "@/app/page";
import FavMediaButton from "@/components/FavMediaButton";
import MediaImage from "@/components/MediaImage";
import { getToken } from "@/server/auth";
import {
  getTMDBContentDetails,
  getTMDBContentTrailers,
} from "@/server/fetchers/tmdb";
import { getUser } from "@/server/fetchers/users";
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

  const token = await getToken();
  const username = token?.user;
  let userData = null;
  if (username) {
    try {
      userData = await getUser(username as string);
    } catch (error) {
      console.log("No user data in movie page:", error);
      userData = null;
    }
  }

  return (
    <div style={pageContainer()}>
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
      <p>Rating: {movie.vote_average}</p>
      <p>Release Date: {movie.release_date}</p>

      <FavMediaButton
        mediaID={parseInt(params.id)}
        userID={userData?.data?.id}
        userFavoriteMedia={userData?.data?.favorite_media}
      />
      <div style={{ marginRight: "10px" }} />

      <MediaImage
        media={movie}
        imageStyle={thumbnailStyle}
        skeletonWidth={250}
        skeletonHeight={400}
      />

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
  );
}

export default Page;
