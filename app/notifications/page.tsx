import { getToken } from "@/server/auth";

const errorTextStyle: React.CSSProperties = {
  padding: "95px 15px 0px 15px",
  textAlign: "center",
};

export default async function Page() {
  const token = await getToken();

  if (!token) {
    return (
      <h2 style={errorTextStyle}>Please log in to see your notifications.</h2>
    );
  }
  return <h2 style={errorTextStyle}>No new notifications.</h2>;
}
