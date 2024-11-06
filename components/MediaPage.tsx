import MyListButton from "@/components/MyListButton";
import { TMDBMovie, TMDBTVShow, TMDBVideo } from "@/types";
import styles from "../styles/MediaPage.module.css";
import { User } from "@/server/db/schema";
import { PostgrestError } from "@supabase/supabase-js";
import MainPageBackground from "./MainPageBackground";
import MediaInfoCard from "./MediaInfoCard";
import PlayButton from "./PlayButton";

type UserData = { data: User | null; error: PostgrestError | null } | null;

const containerStyle: React.CSSProperties = {
  position: "relative",
  width: "100%",
  height: "100%",
};

const infoContainerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};

interface MediaPageProps {
  media: TMDBMovie | TMDBTVShow;
  trailers: TMDBVideo[];
  userData: UserData;
}

export default async function MediaPage({
  media,
  trailers,
  userData,
}: MediaPageProps) {
  const isMovie = "release_date" in media;
  const mediaID = isMovie ? `movie${media.id}` : `tv${media.id}`;

  const trailerID = trailers[0] ? trailers[0].key : undefined;

  return (
    <div style={containerStyle}>
      <MainPageBackground backgroundMedia={media} />
      <div style={infoContainerStyle} className={styles.mainContainerPadding}>
        <MediaInfoCard media={media} />
        <div className={styles.buttonsContainer}>
          <PlayButton trailerID={trailerID} />
          <MyListButton
            mediaID={mediaID}
            username={userData?.data?.name}
            userID={userData?.data?.id}
            userFavoriteMedia={userData?.data?.favorite_media}
          />
        </div>
      </div>
    </div>
  );
}
