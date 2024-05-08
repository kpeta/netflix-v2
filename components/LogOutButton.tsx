import logout from "@/server/auth/logout";

const logoutButtonStyle = {
  cursor: "pointer",
  color: "blue",
  textDecoration: "underline",
};

function LogOutButton(): JSX.Element {
  return (
    <form action={logout}>
      <button style={logoutButtonStyle} type="submit">
        Log out
      </button>
    </form>
  );
}

export default LogOutButton;
