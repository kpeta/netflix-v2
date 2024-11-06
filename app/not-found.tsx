import NotFoundIcon from "@/components/icons/NotFoundIcon";

const notFoundStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  paddingTop: "95px",
};

const textStyle: React.CSSProperties = {
  fontSize: "24px",
  fontWeight: "900",
  whiteSpace: "nowrap",
};

function NotFound() {
  return (
    <div style={notFoundStyle}>
      <NotFoundIcon />
      <div style={textStyle}> Page not found.</div>
    </div>
  );
}

export default NotFound;
