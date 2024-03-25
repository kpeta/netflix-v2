import logout from "@/server/auth/logout";

function LogOutButton(): JSX.Element {
  return (
    <form action={logout}>
      <button type="submit">Log out</button>
    </form>
  );
}

export default LogOutButton;
