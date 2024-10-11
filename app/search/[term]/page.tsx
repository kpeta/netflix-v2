import { searchTMDBContent } from "@/server/fetchers/tmdb";
import styles from "../../../styles/Header.module.css";
import Link from "next/link";
import { pageContainer } from "@/app/page";
import MediaImage from "@/components/MediaImage";
import MediaLabel from "@/components/MediaLabel";

const searchResultStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: "20px",
  marginBottom: "20px",
  cursor: "pointer",
  textDecoration: "none",
  color: "white",
  backgroundColor: "rgb(13, 11, 11)",
  borderRadius: "14px",
  width: "100%",
};

const searchResultImageStyle: React.CSSProperties = {
  width: "80px",
  height: "120px",
  borderRadius: "14px",
};

const infoStyle: React.CSSProperties = {
  width: "50%",
};

const labelStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "11px",
  marginTop: "3px",
  borderRadius: "20%",
  padding: "1px 2px",
  marginLeft: "5vw",
};

async function Page({ params }: { params: { term: string } }) {
  const results = await searchTMDBContent(params.term);

  if (results.length === 0) {
    return (
      <div style={{ color: "white" }}>
        <h2>No results found.</h2>
      </div>
    );
  }

  return (
    <div style={pageContainer()}>
      <div>Search Results</div>
      {results.map((item) => {
        const isMovie = "release_date" in item;

        return (
          <Link
            href={`/${isMovie ? "movie" : "tvshow"}/${item.id}`}
            key={item.id}
            style={searchResultStyle}
            className={styles.netflixLogoImage}
          >
            <MediaImage
              media={item}
              imageStyle={searchResultImageStyle}
              skeletonWidth={80}
              skeletonHeight={120}
            />
            <div style={infoStyle}>
              <div>{isMovie ? item.title : item.name}</div>
              <div>Rating: {item.vote_average}</div>
              <div>
                {isMovie
                  ? `Release Date: ${item.release_date}`
                  : `First Air Date: ${item.first_air_date}`}
              </div>
            </div>
            <MediaLabel isMovie={isMovie} />
          </Link>
        );
      })}
    </div>
  );
}

export default Page;
