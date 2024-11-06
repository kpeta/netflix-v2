const tickIconStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "22px",
  width: "22px",
};

function TickIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={tickIconStyle}
    >
      <path d="M9 19.4L3.3 13.7 4.7 12.3 9 16.6 20.3 5.3 21.7 6.7z" />
    </svg>
  );
}

export default TickIcon;
