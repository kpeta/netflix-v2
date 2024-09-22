"use server";

import supabase from "../db";
import { User } from "../db/schema";

//add user to users table
export async function createUser(name: string, password: string) {
  //new user object should be type User without the id (which is automatically generated in db)
  const newUser: Omit<User, "id"> = {
    name,
    created_at: new Date(),
    password,
    favorite_media: [],
  };

  const { error } = await supabase.from("users").insert(newUser);

  if (error) {
    console.error("Error creating user", error);
    throw error;
  }
}

export async function addUserFavoriteMedia(
  userId: User["id"],
  mediaId: number,
  userExistingFavoriteMedia: number[]
) {
  const { error } = await supabase
    .from("users")
    .update({ favorite_media: [...userExistingFavoriteMedia, mediaId] })
    .eq("id", userId);

  if (error) {
    console.error("Error adding favorite media to user", error);
    throw error;
  }
}
