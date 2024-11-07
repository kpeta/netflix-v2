export const pageContainer = (
  topPadding: number = 80
): React.CSSProperties => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  paddingRight: "13.5vw",
  paddingLeft: "13.5vw",
  gap: "2vh",
  paddingTop: `${topPadding}px`,
});
