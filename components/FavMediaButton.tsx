"use client";

import { useEffect, useState } from "react";
import styles from "../styles/FavMediaButton.module.css";
import {
  addUserFavoriteMedia,
  removeUserFavoriteMedia,
} from "@/server/actions/users";

const ERROR_MESSAGE_TIMEOUT = 1500;

interface FavMediaButtonProps {
  mediaID: number;
  userID?: number;
  userFavoriteMedia?: number[];
}

const FavMediaButton: React.FC<FavMediaButtonProps> = ({
  mediaID,
  userID,
  userFavoriteMedia,
}) => {
  const [isAdd, setIsAdd] = useState(true);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorVisible, setErrorVisible] = useState(false);

  const handleClick = async () => {
    if (!userID) {
      setErrorMessage("Please log in to add to favorites");
      setErrorVisible(true);
      return;
    }

    setLoading(true);
    try {
      if (isAdd) {
        await addUserFavoriteMedia(userID, mediaID, userFavoriteMedia);
      } else {
        await removeUserFavoriteMedia(userID, mediaID, userFavoriteMedia);
      }
      setIsAdd(!isAdd);
    } catch (error) {
      setErrorMessage("An error occurred while adding to favorites");
      setErrorVisible(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (userFavoriteMedia && userFavoriteMedia.includes(mediaID)) {
      setIsAdd(false);
    }
    setLoading(false);
  }, [userFavoriteMedia]);

  // hide error message after a timeout
  useEffect(() => {
    if (errorVisible) {
      const timer = setTimeout(() => {
        setErrorVisible(false);
      }, ERROR_MESSAGE_TIMEOUT);
      return () => clearTimeout(timer);
    }
  }, [errorVisible]);

  return (
    <div className={styles.favButtonWrapper}>
      <div
        className={errorVisible ? styles.errorPopup : styles.errorPopupHidden}
      >
        {errorMessage}
      </div>

      <button
        className={`${styles.favButton} ${isAdd ? styles.add : styles.remove}`}
        style={{
          backgroundColor: loading ? "rgb(151, 147, 147)" : undefined,
          borderColor: loading ? "rgb(219, 211, 211)" : undefined,
          cursor: loading ? "not-allowed" : undefined,
        }}
        onClick={handleClick}
        disabled={loading}
      >
        {loading ? (
          <div className={styles.spinner} />
        ) : (
          <span>{isAdd ? "Add to favorites" : "Remove from favorites"}</span>
        )}
      </button>
    </div>
  );
};

export default FavMediaButton;
