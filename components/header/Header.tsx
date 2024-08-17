import { getToken } from "@/server/auth";
import Link from "next/link";
import styles from "../../styles/Header.module.css";
import Image from "next/image";
import MenuItems from "./MenuItems";
import NotificationsIcon from "./icons/NotificationsIcon";
import UserAvatarButton from "./UserAvatarButton";
import Search from "./Search";
import ResponsiveMenu from "./ResponsiveMenu";
import HeaderScrollEffect from "./HeaderScrollEffect";

const headerContainer: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  padding: "10px 13.5vw",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  zIndex: 100,
};

const headerLeftContainer: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "20px",
};

const headerRightContainer: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "20px",
};

const netflixLogoStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const redButtonLinkStyle = {
  textDecoration: "none",
};

const redButtonTextStyle = {
  fontWeight: 900,
  color: "white",
};

export default async function Header() {
  const token = await getToken();

  return (
    <header style={headerContainer} className={styles.header}>
      <HeaderScrollEffect />
      <div style={headerLeftContainer}>
        <Link href="/" style={netflixLogoStyle}>
          <Image
            className={styles.netflixLogoImage}
            src="/netflix-logo.svg"
            alt="Netflix Logo"
            width={120}
            height={40}
          />
        </Link>
        <ResponsiveMenu />
        <MenuItems />
      </div>

      <div style={headerRightContainer}>
        <Search />
        <Link href="/notifications" className={styles.notificationsIconButton}>
          <NotificationsIcon />
        </Link>
        {token ? (
          <UserAvatarButton token={token} />
        ) : (
          <>
            <div className={styles.userAvatarHide}>
              <UserAvatarButton />
            </div>
            <Link
              href="/signup"
              style={redButtonLinkStyle}
              className={styles.loginButton}
            >
              <button className={styles.redButton}>
                <div style={redButtonTextStyle}>Sign up</div>
              </button>
            </Link>
            <Link
              href="/login"
              style={redButtonLinkStyle}
              className={styles.loginButton}
            >
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
