import logout from "@/server/auth/logout";
import styles from "@/styles/Header.module.css";

const buttonStyle = {
  marginBottom: "10px",
  width: "64px",
  height: "30px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const buttonTextStyle = {
  fontWeight: 900,
  color: "white",
  fontSize: "13px",
  whiteSpace: "nowrap",
};

function LogOutButton() {
  return (
    <form action={logout}>
      <button className={styles.redButton} style={buttonStyle} type="submit">
        <div style={buttonTextStyle}>Sign Out</div>
      </button>
    </form>
  );
}

export default LogOutButton;
