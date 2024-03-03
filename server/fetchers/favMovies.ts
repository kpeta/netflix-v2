import supabase from "../db";
import { PostgrestError } from "@supabase/supabase-js";
import { Movie, User } from "../db/schema";
import { getMovie } from "./movies";

export async function getUserFavoriteMovies(
  userId: User["id"]
): Promise<{ data: Movie[]; error: PostgrestError | null }> {
  const { data, error } = await supabase
    .from("fav_movies")
    .select("movie_id")
    .eq("user_id", userId);
  if (error) {
    console.error("Error fetching user favorite movies:", error);
    throw new Error("Failed to fetch user favorite movies");
  }

  //get movies by ids by using getMovie
  //Promise.all is used to concurrently fetch data; returns once all promises are fulfilled
  const movies = await Promise.all(
    data.map(async (favMovie) => {
      try {
        const movie = await getMovie(favMovie.movie_id);
        if (movie.error) {
          throw new Error(
            `Error fetching movie ${favMovie.movie_id}: ${movie.error.message}`
          );
        }
        return movie.data;
      } catch (error) {
        console.error("Error fetching movie:", error);
        return null;
      }
    })
  );

  return {
    data: movies.filter((movie) => movie !== null) as Movie[],
    error: null,
  };
}
