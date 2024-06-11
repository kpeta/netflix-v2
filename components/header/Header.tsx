import { getToken } from "@/server/auth";
import Link from "next/link";
import styles from "../../styles/Header.module.css";
import Image from "next/image";
import MenuItems from "./MenuItems";
import SearchIcon from "./SearchIcon";
import NotificationsIcon from "./NotificationsIcon";
import UserAvatarButton from "./UserAvatarButton";

const headerContainer: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  paddingTop: "10px",
  paddingLeft: "280px",
  paddingRight: "280px",
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
        <button style={searchIconButtonStyle}>
          <SearchIcon />
        </button>
        <button className={styles.notificationsIconButton}>
          <NotificationsIcon />
        </button>
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
