import { PostgrestError } from "@supabase/supabase-js";
import { User } from "../db/schema";
import supabase from "../db";

export async function getUser(
  username: User["name"]
): Promise<{ data: User | null; error: PostgrestError | null }> {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("name", username)
    .single();

  if (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
  return { data, error: null };
}

export async function getUserFavoriteMedia(
  userId: User["id"]
): Promise<{ data: number[]; error: PostgrestError | null }> {
  const { data, error } = await supabase
    .from("users")
    .select("favorite_media")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Error fetching user favorite media:", error);
    throw error;
  }
  return { data: data?.favorite_media || [], error: null };
}
