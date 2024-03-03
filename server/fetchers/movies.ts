import { PostgrestError } from "@supabase/supabase-js";
import { Movie } from "../db/schema";
import supabase from "../db";

export async function getMovie(
  movieId: Movie["movie_id"]
): Promise<{ data: Movie | null; error: PostgrestError | null }> {
  const { data, error } = await supabase
    .from("movies")
    .select("*")
    .eq("movie_id", movieId)
    .single();
  if (error) {
    console.error("Error fetching movie:", error);
    throw new Error("Failed to fetch movie");
  }
  return { data, error: null };
}
