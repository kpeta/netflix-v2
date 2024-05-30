import { getToken } from "@/server/auth";
import Link from "next/link";
import LogOutButton from "./LogOutButton";
import styles from "../styles/Header.module.css";

const menuItems = ["Home", "TV Shows", "Movies", "New & Popular", "My List"];

const headerContainer = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
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
  width: "150px",
};

const menuItemStyle = {
  color: "black",
  textDecoration: "none",
};

export default async function Header() {
  const token = await getToken();

  return (
    <header style={headerContainer}>
      <div style={headerLeftContainer}>
        <button style={logoStyle}>
          <Link href="/">Netflix Logo</Link>
        </button>
        <button className={styles.menuButtonContainer}>Menu</button>
        <div className={styles.menuItemsContainer}>
          {menuItems.map((item, index) => (
            <button style={menuItemStyle} key={index}>
              {item}
            </button>
          ))}
        </div>
      </div>

      <div style={headerRightContainer}>
        <button>Search Icon</button>
        <button className={styles.notificationIcon}>Notifications Icon</button>
        {token ? (
          <>
            <div>Hi, {token.user}</div>
            <LogOutButton />
          </>
        ) : (
          <>
            <button>
              <Link href="/signup">Sign up</Link>
            </button>
            <button>
              <Link href="/login">Log in</Link>
            </button>
          </>
        )}
      </div>
    </header>
  );
}
