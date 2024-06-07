import { getToken } from "@/server/auth";
import Link from "next/link";
import LogOutButton from "../LogOutButton";
import styles from "../../styles/Header.module.css";
import Image from "next/image";
import "../../styles/fonts.css";
import MenuItems from "./MenuItems";
import SearchIcon from "./SearchIcon";
import NotificationsIcon from "./NotificationsIcon";

const headerContainer: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  paddingTop: "10px",
  paddingLeft: "200px",
  paddingRight: "200px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "transparent",
};

const headerLeftContainer = {
  display: "flex",
  alignItems: "center",
  gap: "30px",
};

const headerRightContainer = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
};

const logoStyle = {
  border: "none",
  background: "none",
};

const searchIconButtonStyle = {
  backgroundColor: "transparent",
  border: "none",
};

const redButtonLinkStyle = {
  textDecoration: "none",
};

const redButtonTextStyle = {
  fontWeight: "bold",
  color: "white",
};

export default async function Header() {
  const token = await getToken();

  return (
    <header style={headerContainer}>
      <div style={headerLeftContainer}>
        <button style={logoStyle}>
          <Link href="/">
            <Image
              className={styles.netflixLogoImage}
              src="/netflix-logo.svg"
              alt="Netflix Logo"
              width={140}
              height={50}
            />
          </Link>
        </button>
        <button className={styles.menuButtonContainer}>Menu</button>
        <MenuItems />
      </div>

      <div style={headerRightContainer}>
        <button style={searchIconButtonStyle}>
          <SearchIcon />
        </button>
        <button className={styles.notificationsIconButton}>
          <NotificationsIcon />
        </button>
        {token ? (
          <>
            <div>Hi, {token.user}</div>
            <LogOutButton />
          </>
        ) : (
          <>
            <Link href="/signup" style={redButtonLinkStyle}>
              <button className={styles.redButton}>
                <div style={redButtonTextStyle}>Sign up</div>
              </button>
            </Link>
            <Link href="/login" style={redButtonLinkStyle}>
              <button className={styles.redButton}>
                <div style={redButtonTextStyle}>Log in</div>
              </button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
