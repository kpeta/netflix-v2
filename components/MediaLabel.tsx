interface MediaLabelProps {
  isMovie: boolean;
}

const labelStyle: React.CSSProperties = {
  fontSize: "11px",
  marginTop: "3px",
  borderRadius: "32%",
  padding: "2px 3px",
  color: "white",
  fontWeight: 600,
  textAlign: "center",
};

const MediaLabel = ({ isMovie }: MediaLabelProps) => {
  return (
    <div>
      <div
        style={{
          ...labelStyle,
          backgroundColor: `${isMovie ? "purple" : "green"}`,
        }}
      >
        {isMovie ? "Movie" : "TV Show"}
      </div>
    </div>
  );
};

export default MediaLabel;
