import { getToken } from "@/server/auth";
import { getTMDBContentDetails } from "@/server/fetchers/tmdb";
import { getUser } from "@/server/fetchers/users";
import { TMDBMovie, TMDBTVShow } from "@/types";
import MediaList from "@/components/MediaList";

type TMDBContent = TMDBMovie | TMDBTVShow;

const errorTextStyle: React.CSSProperties = {
  paddingTop: "95px",
  textAlign: "center",
};

const containerStyle: React.CSSProperties = {
  paddingTop: "89px",
};

const titleTextStyle: React.CSSProperties = {
  fontSize: "24px",
  fontWeight: "900",
  paddingBottom: "20px",
  paddingLeft: "13.5vw",
};

export default async function Page() {
  const token = await getToken();

  if (!token) {
    return <h2 style={errorTextStyle}>Please log in to see your favorites.</h2>;
  }

  const username = token?.user;
  let userData = null;
  if (username) {
    try {
      userData = await getUser(username as string);
    } catch (error) {
      console.error("No user data in My List page:", error);
      userData = null;
    }
  }

  const favorites: TMDBContent[] = [];
  for (const favorite of userData?.data?.favorite_media || []) {
    const isMovie = favorite.includes("movie"); // media is saved as "movie123" or "tv123"
    const favoriteID = Number(favorite.match(/\d+/)?.[0]);
    const favoriteDetails = isMovie
      ? await getTMDBContentDetails(favoriteID, "movie")
      : await getTMDBContentDetails(favoriteID, "tv");
    if (favoriteDetails) {
      favorites.push(favoriteDetails);
    }
  }

  if (favorites.length === 0) {
    return <h2 style={errorTextStyle}>No favorites added yet.</h2>;
  }

  return (
    <div style={containerStyle}>
      <div style={titleTextStyle}>Favorites List</div>
      <MediaList mediaItems={favorites} />
    </div>
  );
}
