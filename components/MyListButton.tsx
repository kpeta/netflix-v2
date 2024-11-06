"use client";

import { useEffect, useState } from "react";
import styles from "../styles/MyListButton.module.css";
import {
  addUserFavoriteMedia,
  removeUserFavoriteMedia,
} from "@/server/modifiers/users";
import { User } from "@/server/db/schema";
import PlusIcon from "./icons/PlusIcon";
import TickIcon from "./icons/TickIcon";

const ERROR_MESSAGE_TIMEOUT = 1500;

interface MyListButtonProps {
  mediaID: string;
  userID?: User["id"];
  username?: User["name"];
  userFavoriteMedia?: User["favorite_media"];
}

const buttonStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
};

const spinnerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const MyListButton: React.FC<MyListButtonProps> = ({
  mediaID,
  userID,
  username,
  userFavoriteMedia,
}) => {
  const [isAdded, setIsAdded] = useState(true);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorVisible, setErrorVisible] = useState(false);

  const handleClick = async () => {
    if (!userID || !username) {
      setErrorMessage("Please log in to add to favorites");
      setErrorVisible(true);
      return;
    }

    setLoading(true);
    try {
      if (isAdded) {
        await addUserFavoriteMedia(
          userID,
          username,
          mediaID,
          userFavoriteMedia
        );
      } else {
        await removeUserFavoriteMedia(
          userID,
          username,
          mediaID,
          userFavoriteMedia
        );
      }
      setIsAdded(!isAdded);
    } catch (error) {
      setErrorMessage("An error occurred while adding to favorites");
      setErrorVisible(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (userFavoriteMedia && userFavoriteMedia.includes(mediaID)) {
      setIsAdded(false);
    }
    setLoading(false);
  }, [userFavoriteMedia, mediaID]);

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
        className={styles.button}
        style={{
          cursor: loading ? "not-allowed" : "pointer",
          ...buttonStyle,
        }}
        onClick={handleClick}
        disabled={loading}
      >
        {loading ? (
          <div style={spinnerStyle}>
            <div className={styles.spinner} />
          </div>
        ) : (
          <div>{isAdded ? <PlusIcon /> : <TickIcon />}</div>
        )}
        <div>My List</div>
      </button>
    </div>
  );
};

export default MyListButton;
