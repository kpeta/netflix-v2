"use server";

import { TMDB_BASE_URL } from "@/constants";
import { TMDBMovie, TMDBTVShow, TMDBVideo } from "@/types";

interface TMDBDataParams {
  type: "movie" | "tv";
  category: "trending" | "top_rated" | "upcoming" | "genre";
  genre?: "action" | "comedy" | "scary" | "romance" | "documentaries";
}

type TMDBContentType = "movie" | "tv";

const genreIds = {
  action: 28,
  comedy: 35,
  scary: 27,
  romance: 10749,
  documentaries: 99,
};

export const getTMDBData = async ({
  type,
  category,
  genre,
}: TMDBDataParams): Promise<TMDBMovie[] | TMDBTVShow[]> => {
  try {
    let url = `${TMDB_BASE_URL}`;

    switch (category) {
      case "trending":
        url += `/trending/${type}/week`;
        break;
      case "top_rated":
        url += `/discover/${type}?sort_by=vote_average.desc&vote_count.gte=10000`;
        break;
      case "upcoming":
        const today = new Date().toISOString().split("T")[0];
        if (type === "movie") {
          url += `/discover/movie?primary_release_date.gte=${today}&sort_by=popularity.desc&include_adult=false`;
        } else if (type === "tv") {
          url += `/discover/tv?first_air_date.gte=${today}&sort_by=popularity.desc&include_adult=false`;
        }
        break;
      case "genre":
        if (genre && genreIds[genre]) {
          url += `/discover/${type}?with_genres=${genreIds[genre]}`;
        } else {
          throw new Error(
            "Invalid genre or genre not provided for category 'genre'."
          );
        }
        break;
      default:
        throw new Error("Invalid category provided.");
    }

    // add the `api_key` to the `url`, using "&" if query parameters exist, otherwise "?"
    url += `${url.includes("?") ? "&" : "?"}api_key=${
      process.env.TMDB_API_KEY
    }`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${category} ${type}s`);
    }

    const data = await response.json();
    return type === "tv"
      ? (data.results as TMDBTVShow[])
      : (data.results as TMDBMovie[]);
  } catch (error) {
    console.error(`Error fetching ${category} ${type}s:`, error);
    return [];
  }
};

export const getTMDBContentDetails = async (
  id: number,
  contentType: TMDBContentType
): Promise<TMDBMovie | TMDBTVShow> => {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/${contentType}/${id}?api_key=${process.env.TMDB_API_KEY}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch ${contentType} details`);
    }
    const data = await response.json();
    return contentType === "tv" ? (data as TMDBTVShow) : (data as TMDBMovie);
  } catch (error) {
    console.error(`Error fetching ${contentType} details:`, error);
    return {} as TMDBMovie | TMDBTVShow;
  }
};

export const getTMDBContentTrailers = async (
  id: number,
  contentType: TMDBContentType
): Promise<TMDBVideo[]> => {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/${contentType}/${id}/videos?api_key=${process.env.TMDB_API_KEY}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch ${contentType} videos`);
    }
    const data = await response.json();
    const videos: TMDBVideo[] = data.results.filter(
      (video: TMDBVideo) => video.type === "Trailer"
    );
    return videos;
  } catch (error) {
    console.error(`Error fetching ${contentType} videos:`, error);
    return [];
  }
};

export const searchTMDBContent = async (
  query: string
): Promise<(TMDBMovie | TMDBTVShow)[]> => {
  try {
    const movieResponse = await fetch(
      `${TMDB_BASE_URL}/search/movie?api_key=${
        process.env.TMDB_API_KEY
      }&query=${encodeURIComponent(query)}`
    );
    if (!movieResponse.ok) {
      throw new Error(
        `Failed to fetch movie search results: ${movieResponse.statusText}`
      );
    }
    const movieData = await movieResponse.json();
    const movies: TMDBMovie[] = movieData.results as TMDBMovie[];

    const tvShowResponse = await fetch(
      `${TMDB_BASE_URL}/search/tv?api_key=${
        process.env.TMDB_API_KEY
      }&query=${encodeURIComponent(query)}`
    );
    if (!tvShowResponse.ok) {
      throw new Error(
        `Failed to fetch TV show search results: ${tvShowResponse.statusText}`
      );
    }
    const tvShowData = await tvShowResponse.json();
    const tvShows: TMDBTVShow[] = tvShowData.results as TMDBTVShow[];

    const combinedResults: (TMDBMovie | TMDBTVShow)[] = [...movies, ...tvShows];

    // sort combined results by popularity in descending order
    const sortedResults = combinedResults.sort((a, b) => {
      const aPopularity = "popularity" in a ? a.popularity : 0;
      const bPopularity = "popularity" in b ? b.popularity : 0;
      return bPopularity - aPopularity;
    });

    return sortedResults;
  } catch (error) {
    console.error("Error fetching search results:", error);
    return [];
  }
};
