import {
  getTMDBContentDetails,
  getTMDBContentTrailers,
} from "@/server/fetchers/tmdb";
import { TMDBTVShow, TMDBVideo } from "@/types";
import MediaPage from "@/components/MediaPage";
import { getToken } from "@/server/auth";
import { getUser } from "@/server/fetchers/users";
import { checkIfValidDate } from "@/utils/validation";

const notFoundStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  paddingTop: "95px",
};

async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const tvShow = (await getTMDBContentDetails(
    parseInt(params.id),
    "tv"
  )) as TMDBTVShow;

  if (!checkIfValidDate(tvShow.first_air_date)) {
    return <h2 style={notFoundStyle}>TV Show not found.</h2>;
  }

  const trailers: TMDBVideo[] = await getTMDBContentTrailers(
    parseInt(params.id),
    "tv"
  );

  const token = await getToken();
  const username = token?.user;
  let userData = null;
  if (username) {
    try {
      userData = await getUser(username as string);
    } catch (error) {
      console.error("No user data in tv show page:", error);
      userData = null;
    }
  }

  return <MediaPage media={tvShow} trailers={trailers} userData={userData} />;
}

export default Page;
