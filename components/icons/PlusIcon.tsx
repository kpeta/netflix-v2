const plusIconStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "22px",
  width: "22px",
};

function PlusIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={plusIconStyle}
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export default PlusIcon;
