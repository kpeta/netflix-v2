import { getToken } from "@/server/auth";

const errorTextStyle: React.CSSProperties = {
  paddingTop: "95px",
  textAlign: "center",
};

export default async function Page() {
  const token = await getToken();

  if (!token) {
    return (
      <h3 style={errorTextStyle}>Please log in to see your notifications.</h3>
    );
  }
  return <h3 style={errorTextStyle}>No new notifications.</h3>;
}
