import React from "react";
import FavMediaButton from "@/components/FavMediaButton";
import MediaImage from "@/components/MediaImage";
import { TMDBMovie, TMDBTVShow, TMDBVideo } from "@/types";
import styles from "../styles/MediaPage.module.css";
import MediaInfo from "./MediaInfo";
import { User } from "@/server/db/schema";
import { PostgrestError } from "@supabase/supabase-js";

type UserData = { data: User | null; error: PostgrestError | null } | null;

const thumbnailStyle: React.CSSProperties = {
  width: "250px",
  height: "400px",
  borderRadius: "20px",
};

const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  paddingTop: "95px",
  width: "100%",
  gap: "50px",
};

const trailerContainerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  height: "100%",
};

interface MediaPageProps {
  media: TMDBMovie | TMDBTVShow;
  trailers: TMDBVideo[];
  userData: UserData;
}

const MediaPage: React.FC<MediaPageProps> = ({ media, trailers, userData }) => {
  const isMovie = "release_date" in media;
  const mediaID = isMovie ? `movie${media.id}` : `tv${media.id}`;

  return (
    <div style={containerStyle} className={styles.mainContainerPadding}>
      <div className={styles.titleContainer}>
        <div className={styles.titleText}>
          {isMovie ? (media as TMDBMovie).title : (media as TMDBTVShow).name}
        </div>
        <FavMediaButton
          mediaID={mediaID}
          userID={userData?.data?.id}
          userFavoriteMedia={userData?.data?.favorite_media}
        />
      </div>

      <div className={styles.mediaImageAndInfoContainer}>
        <MediaImage
          media={media}
          imageStyle={thumbnailStyle}
          skeletonWidth={250}
          skeletonHeight={400}
        />
        <div className={styles.mediaInfoContainer}>
          <MediaInfo media={media} />
          <div className={styles.mediaOverview}>{media.overview}</div>

          {trailers.length > 0 ? (
            <div style={trailerContainerStyle}>
              <iframe
                src={`https://www.youtube.com/embed/${trailers[0].key}`}
                className={styles.trailer}
                allowFullScreen
              />
            </div>
          ) : (
            <div className={styles.trailerText}>No Trailer Found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MediaPage;
