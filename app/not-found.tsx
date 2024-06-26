import NotFoundIcon from "@/components/icons/NotFoundIcon";

const notFoundStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "bold",
  fontSize: "2.5vh",
  whiteSpace: "nowrap",
};

const textStyle: React.CSSProperties = {};

function NotFound() {
  return (
    <div style={notFoundStyle}>
      <NotFoundIcon />
      <div style={textStyle}> | This page could not be found</div>
    </div>
  );
}

export default NotFound;
