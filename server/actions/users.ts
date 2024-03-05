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
  };

  const { data, error } = await supabase.from("users").insert(newUser);

  if (error) {
    console.error("Error creating user", error);
    throw error;
  } else {
    console.log(data);
  }
}
