import { getToken } from "@/server/auth";
import Link from "next/link";
import styles from "../styles/Header.module.css";
import LogOutButton from "./LogOutButton";

export default async function Header() {
  const token = await getToken();

  return (
    <header className={styles.header}>
      <div className={styles.leftContent}>
        <button className={styles.buttonWrapper}>
          <Link href="/">Logo</Link>
        </button>
      </div>
      <div className={styles.rightContent}>
        {token ? (
          <>
            <p>Hi, {token.user.username}</p>
            <div className={styles.buttonWrapper}>
              <LogOutButton />
            </div>
          </>
        ) : (
          <>
            <button className={styles.buttonWrapper}>
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
