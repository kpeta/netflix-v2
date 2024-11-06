const playIconStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "22px",
  width: "22px",
};

function PlayIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={playIconStyle}
    >
      <polygon points="5 3 19 12 5 21 5 3"></polygon>
    </svg>
  );
}

export default PlayIcon;
