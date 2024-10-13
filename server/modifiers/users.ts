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
  mediaId: string,
  userExistingFavoriteMedia?: User["favorite_media"]
) {
  // if user has no existing favorite media, set it to an empty array
  if (!userExistingFavoriteMedia) userExistingFavoriteMedia = [];

  // if mediaId is already in the user's favorite media, return
  if (userExistingFavoriteMedia.includes(mediaId)) return;

  const { error } = await supabase
    .from("users")
    .update({ favorite_media: [...userExistingFavoriteMedia, mediaId] })
    .eq("id", userId);

  if (error) {
    console.error("Error adding favorite media to user", error);
    throw error;
  }
}

export async function removeUserFavoriteMedia(
  userId: User["id"],
  mediaId: string,
  userExistingFavoriteMedia?: User["favorite_media"]
) {
  // if user has no existing favorite media, set it to an empty array
  if (!userExistingFavoriteMedia) userExistingFavoriteMedia = [];

  // filter out the mediaId to remove it from the existing favorites
  const updatedFavoriteMedia = userExistingFavoriteMedia.filter(
    (id) => id !== mediaId
  );

  const { error } = await supabase
    .from("users")
    .update({ favorite_media: updatedFavoriteMedia })
    .eq("id", userId);

  if (error) {
    console.error("Error removing favorite media from user", error);
    throw error;
  }
}
