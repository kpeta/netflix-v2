const watchIconStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "15px",
  width: "15px",
};

function WatchIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={watchIconStyle}
    >
      <circle cx="12" cy="12" r="10" /> {/* Outer Circle */}
      <path d="M12 6v6l4 2" /> {/* Watch Hands */}
    </svg>
  );
}

export default WatchIcon;
