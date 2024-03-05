import supabase from "../db";
import { FavoriteMovie } from "../db/schema";

//add movie_id and user_id to fav_movies table
export async function createFavoriteMovie(user_id: number, movie_id: number) {
  const newFavorite: FavoriteMovie = {
    user_id,
    movie_id,
  };

  //supabase will throw error if user_id or movie_id does not exist
  const { data, error } = await supabase.from("fav_movies").insert(newFavorite);

  if (error) {
    console.error("Error creating a favorite movie", error);
    throw error;
  } else {
    console.log(data);
  }
}
