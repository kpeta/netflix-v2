import NotFoundIcon from "@/components/icons/NotFoundIcon";
import { pageContainer } from "./page";

const notFoundStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
};

const textStyle: React.CSSProperties = {
  fontWeight: "bold",
  fontSize: "16px",
  whiteSpace: "nowrap",
};

function NotFound() {
  return (
    <div style={pageContainer()}>
      <div style={notFoundStyle}>
        <NotFoundIcon />
        <div style={textStyle}> | This page could not be found</div>
      </div>
    </div>
  );
}

export default NotFound;
