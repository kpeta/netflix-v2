"use server";

import supabase from "../db";
import { Movie } from "../db/schema";

//add movie to movies table
export async function createMovie(
  thumbnail: string,
  title: string,
  description: string,
  rating: number,
  trailer: string
) {
  //new movie object should be type Movie without the movie_id (which is automatically generated in db)
  const newMovie: Omit<Movie, "movie_id"> = {
    thumbnail,
    title,
    description,
    rating,
    trailer,
  };

  const { data, error } = await supabase.from("movies").insert(newMovie);

  if (error) {
    console.error("Error creating a movie", error);
    throw error;
  } else {
    console.log(data);
  }
}
