"use client";

import React, { useState, useRef, useEffect } from "react";
import { TokenPayload } from "@/server/auth";
import styles from "../../styles/Header.module.css";
import LogOutButton from "../LogOutButton";
import Link from "next/link";

type UserAvatarButtonProps = {
  token: TokenPayload;
};

const containerStyle: React.CSSProperties = {
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const noDefaultStylingButtonStyle = {
  backgroundColor: "transparent",
  border: "none",
};

const buttonTextStyle = {
  fontWeight: 900,
  color: "white",
};

const menuStyle: React.CSSProperties = {
  position: "absolute",
  top: "101%",
  right: 0,
  width: "150px",
  borderRadius: "8px",
  backgroundColor: "black",
  boxShadow: "0px 1px 2px rgb(163, 164, 167)",
  padding: "6px",
  zIndex: 1,
};

const usernameStyle: React.CSSProperties = {
  paddingLeft: "6px",
  fontSize: "14px",
  fontWeight: 700,
  padding: "10px",
  color: "rgb(224, 232, 241)",
  whiteSpace: "nowrap",
};

const optionsStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  gap: "10px",
  paddingRight: "6px",
};

const menuItemStyle: React.CSSProperties = {
  fontSize: "12px",
  cursor: "pointer",
};

function UserAvatarButton({ token }: UserAvatarButtonProps) {
  const [menuVisible, setMenuVisible] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleButtonClick = () => {
    setMenuVisible(!menuVisible);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      //check if buttonRef & menuRef.current is defined and the click event did not originate from within the button or menu element
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node) &&
      menuRef.current &&
      !menuRef.current.contains(event.target as Node)
    ) {
      //click outside detected, hide menu
      setMenuVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div style={containerStyle}>
      <button
        ref={buttonRef}
        style={noDefaultStylingButtonStyle}
        onClick={handleButtonClick}
      >
        <div className={styles.userAvatar}>
          <div style={buttonTextStyle}>
            {token.user
              .split(" ")
              .map((word) => word.charAt(0))
              .join("")}
          </div>
        </div>
      </button>
      {menuVisible && (
        <div ref={menuRef} style={menuStyle}>
          <div style={usernameStyle}>Hi, {token.user}!</div>
          <div style={optionsStyle}>
            <Link
              href="/new-and-popular"
              className={styles.menuItem}
              style={menuItemStyle}
            >
              New & Popular
            </Link>
            <Link
              href="/my-list"
              className={styles.menuItem}
              style={menuItemStyle}
            >
              My List
            </Link>
            <Link
              href="/notifications"
              className={styles.menuItem}
              style={menuItemStyle}
            >
              Notifications
            </Link>
            <LogOutButton />
          </div>
        </div>
      )}
    </div>
  );
}

export default UserAvatarButton;
