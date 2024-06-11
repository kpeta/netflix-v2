import { getToken } from "@/server/auth";
import Link from "next/link";
import styles from "../../styles/Header.module.css";
import Image from "next/image";
import MenuItems from "./MenuItems";
import NotificationsIcon from "./NotificationsIcon";
import UserAvatarButton from "./UserAvatarButton";
import Search from "./Search";

const headerContainer: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  paddingTop: "10px",
  marginLeft: "280px",
  marginRight: "280px",
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
  justifyContent: "center",
  gap: "20px",
};

const logoStyle = {
  border: "none",
  background: "none",
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
    <header style={headerContainer}>
      <div style={headerLeftContainer}>
        <button style={logoStyle}>
          <Link href="/">
            <Image
              className={styles.netflixLogoImage}
              src="/netflix-logo.svg"
              alt="Netflix Logo"
              width={120}
              height={40}
            />
          </Link>
        </button>
        <button className={styles.menuButtonContainer}>Menu</button>
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
