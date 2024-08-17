const infoIconStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "1.5em",
  width: "1.5em",
};

function InfoIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={infoIconStyle}
    >
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M12 16v-4"></path>
      <path d="M12 8h.01"></path>
    </svg>
  );
}

export default InfoIcon;
