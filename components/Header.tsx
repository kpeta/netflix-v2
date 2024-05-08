import { getToken } from "@/server/auth";
import Link from "next/link";
import styles from "../styles/Header.module.css";
import LogOutButton from "./LogOutButton";

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const headerRightStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
};

export default async function Header() {
  const token = await getToken();
  console.log(token);

  return (
    <header style={headerStyle}>
      <button>
        <Link href="/">Logo</Link>
      </button>
      <div style={headerRightStyle}>
        {token ? (
          <>
            <p>Hi, {token.user}</p>
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
