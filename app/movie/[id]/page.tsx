import { getToken } from "@/server/auth";
import {
  getTMDBContentDetails,
  getTMDBContentTrailers,
} from "@/server/fetchers/tmdb";
import { getUser } from "@/server/fetchers/users";
import { TMDBMovie, TMDBVideo } from "@/types";
import MediaPage from "@/components/MediaPage";

export const revalidate = 0; // needed for correct user fav media display

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
      console.error("No user data in movie page:", error);
      userData = null;
    }
  }

  return <MediaPage media={movie} trailers={trailers} userData={userData} />;
}

export default Page;
