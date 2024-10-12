import { searchTMDBContent } from "@/server/fetchers/tmdb";
import styles from "@/styles/SearchResult.module.css";
import Link from "next/link";
import MediaImage from "@/components/MediaImage";
import MediaLabel from "@/components/MediaLabel";
import { circleStyle, getColorFromRating } from "@/components/MediaInfo";
import { checkIfValidDate } from "@/utils/validation";

const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  gap: "10px",
  paddingTop: "89px",
};

const titleTextStyle: React.CSSProperties = {
  fontSize: "24px",
  fontWeight: "900",
};

const searchResultStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  gap: "5px",
  alignItems: "center",
  justifyContent: "flex-start",
  cursor: "pointer",
  textDecoration: "none",
  color: "white",
  backgroundColor: "rgb(15, 15, 15)",
  borderRadius: "14px",
  paddingRight: "5px",
  paddingTop: "5px",
  paddingBottom: "5px",
  border: "1px solid rgb(34, 34, 34)",
};

const imageAndInfoStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: "10px",
  width: "80%",
};

const searchResultImageStyle: React.CSSProperties = {
  width: "80px",
  height: "120px",
  borderRadius: "14px",
};

const infoStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  gap: "5px",
  fontWeight: "900",
};

const mediaTitleStyle: React.CSSProperties = {
  fontSize: "18px",
};

const ratingContainerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  gap: "8px",
  alignItems: "center",
};

const releaseDateStyle: React.CSSProperties = {
  whiteSpace: "nowrap",
  color: "lightgray",
};

async function Page({ params }: { params: { term: string } }) {
  const results = await searchTMDBContent(params.term);

  // filter out results with invalid or missing dates
  const filteredResults = results.filter((item) => {
    const isMovie = "release_date" in item;
    const date = isMovie ? item.release_date : item.first_air_date;
    return date && checkIfValidDate(date);
  });

  if (filteredResults.length === 0) {
    return (
      <div style={containerStyle}>
        <h2>No results found.</h2>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={titleTextStyle}>Search Results</div>
      {filteredResults.map((item) => {
        const isMovie = "release_date" in item;

        return (
          <Link
            href={`/${isMovie ? "movie" : "tvshow"}/${item.id}`}
            key={item.id}
            style={searchResultStyle}
            className={styles.searchResult}
          >
            <div style={imageAndInfoStyle}>
              <MediaImage
                media={item}
                imageStyle={searchResultImageStyle}
                skeletonWidth={80}
                skeletonHeight={120}
              />
              <div style={infoStyle}>
                <div style={mediaTitleStyle}>
                  {isMovie ? item.title : item.name}
                </div>
                <div style={ratingContainerStyle}>
                  <div
                    style={{
                      color: getColorFromRating(item.vote_average),
                    }}
                  >
                    {item.vote_average?.toFixed(2)}
                  </div>
                  <div
                    style={{
                      ...circleStyle,
                      backgroundColor: getColorFromRating(item.vote_average),
                    }}
                  />
                </div>

                <div style={releaseDateStyle}>
                  {isMovie
                    ? new Date(item.release_date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    : new Date(item.first_air_date).toLocaleDateString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                </div>
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
