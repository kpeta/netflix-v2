"use server";

import { revalidatePath } from "next/cache";
import supabase from "../db";

//add user to users table
export async function createUser(name: string, password: string) {
  const newUser = {
    name,
    created_at: new Date(),
    password,
  };

  const { data, error } = await supabase.from("users").insert(newUser);

  if (error) {
    console.error(error);
  } else {
    console.log(data);
  }

  revalidatePath("/");
}
