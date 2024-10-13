import { searchTMDBContent } from "@/server/fetchers/tmdb";
import MediaList from "@/components/MediaList";
import { checkIfValidDate } from "@/utils/validation";

const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "20px",
  paddingTop: "89px",
};

const titleTextStyle: React.CSSProperties = {
  fontSize: "24px",
  fontWeight: "900",
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
      <MediaList mediaItems={filteredResults} />
    </div>
  );
}

export default Page;
