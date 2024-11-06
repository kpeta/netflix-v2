import { getToken } from "@/server/auth";
import {
  getTMDBContentDetails,
  getTMDBContentTrailers,
} from "@/server/fetchers/tmdb";
import { getUser } from "@/server/fetchers/users";
import { TMDBMovie, TMDBVideo } from "@/types";
import MediaPage from "@/components/MediaPage";
import { checkIfValidDate } from "@/utils/validation";

const notFoundStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  paddingTop: "95px",
};

async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const movie = (await getTMDBContentDetails(
    parseInt(params.id),
    "movie"
  )) as TMDBMovie;

  if (!checkIfValidDate(movie.release_date)) {
    return <h2 style={notFoundStyle}>Movie not found.</h2>;
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
      console.error("No user data in movie page:", error);
      userData = null;
    }
  }

  return <MediaPage media={movie} trailers={trailers} userData={userData} />;
}

export default Page;
