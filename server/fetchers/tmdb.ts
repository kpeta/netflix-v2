import { TMDB_BASE_URL } from "@/lib/constants";
import { TMDBMovie, TMDBVideo } from "@/types";

export const getTMDBPopularMovies = async (): Promise<TMDBMovie[]> => {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/popular?api_key=${process.env.TMDB_API_KEY}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch popular movies");
    }
    const data = await response.json();
    return data.results as TMDBMovie[];
  } catch (error) {
    console.error("Error fetching popular movies:", error);
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
