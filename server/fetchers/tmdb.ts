"use server";

import { TMDB_BASE_URL } from "@/constants";
import { TMDBMovie, TMDBVideo } from "@/types";

interface TMDBDataParams {
  type: "movie" | "tv";
  category: "trending" | "top_rated" | "upcoming" | "genre";
  genre?: "action" | "comedy" | "scary" | "romance" | "documentaries";
}

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
}: TMDBDataParams): Promise<TMDBMovie[]> => {
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
        // Use Discover API to get upcoming movies and TV shows by filtering for future first_air_date
        const today = new Date().toISOString().split("T")[0];
        if (type === "movie") {
          url += `/discover/movie?primary_release_date.gte=${today}&sort_by=popularity.desc`;
        } else if (type === "tv") {
          url += `/discover/tv?first_air_date.gte=${today}&sort_by=first_air_date.asc`;
        } else {
          throw new Error("Invalid type provided for upcoming category.");
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

    url += `${url.includes("?") ? "&" : "?"}api_key=${
      process.env.TMDB_API_KEY
    }`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${category} ${type}s`);
    }

    const data = await response.json();
    return data.results as TMDBMovie[];
  } catch (error) {
    console.error(`Error fetching ${category} ${type}s:`, error);
    return [];
  }
};

export const getTMDBMovieDetails = async (
  movieId: number
): Promise<TMDBMovie> => {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/${movieId}?api_key=${process.env.TMDB_API_KEY}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch movie details");
    }
    const data = await response.json();
    return data as TMDBMovie;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return {} as TMDBMovie;
  }
};

export const getTMDBMovieTrailers = async (
  movieId: number
): Promise<TMDBVideo[]> => {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/${movieId}/videos?api_key=${process.env.TMDB_API_KEY}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch movie videos");
    }
    const data = await response.json();
    const videos: TMDBVideo[] = data.results.filter(
      (video: TMDBVideo) => video.type === "Trailer"
    );
    return videos;
  } catch (error) {
    console.error("Error fetching movie videos:", error);
    return [];
  }
};

export const searchTMDBMovies = async (query: string): Promise<TMDBMovie[]> => {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${query}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch search results: " + response.statusText);
    }
    const data = await response.json();
    return data.results as TMDBMovie[];
  } catch (error) {
    console.error("Error fetching search results:", error);
    return [];
  }
};
