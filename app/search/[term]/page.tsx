import { searchTMDBContent } from "@/server/fetchers/tmdb";
import MediaList from "@/components/MediaList";
import { checkIfValidDate } from "@/utils/validation";

const containerStyle: React.CSSProperties = {
  paddingTop: "95px",
};

const errorContainerStyle: React.CSSProperties = {
  textAlign: "center",
  paddingTop: "95px",
};

const titleTextStyle: React.CSSProperties = {
  fontSize: "24px",
  fontWeight: "900",
  paddingBottom: "20px",
  paddingLeft: "13.5vw",
  paddingRight: "13.5vw",
};

async function Page(props: { params: Promise<{ term: string }> }) {
  const params = await props.params;
  const results = await searchTMDBContent(params.term);
  const searchTerm = params.term.replace(/-/g, " "); // replace hyphens with spaces

  // filter out results with invalid or missing dates
  const filteredResults = results.filter((item) => {
    const isMovie = "release_date" in item;
    const date = isMovie ? item.release_date : item.first_air_date;
    return date && checkIfValidDate(date);
  });

  if (filteredResults.length === 0) {
    return <h2 style={errorContainerStyle}>No search results found.</h2>;
  }

  return (
    <div style={containerStyle}>
      <div style={titleTextStyle}>
        Search Results for &#39;{searchTerm}&#39;
      </div>
      <MediaList mediaItems={filteredResults} />
    </div>
  );
}

export default Page;
