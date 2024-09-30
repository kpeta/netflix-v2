"use server";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { checkIfValidUsername, checkIfValidPassword } from "@/utils/validation";
import { createToken } from ".";
import { getUser } from "../fetchers/users";
import { PostgrestError } from "@supabase/supabase-js";

interface ActionResult {
  error: string;
}

export default async function login(
  prevState: any, //this argument is not used in this function, but it is required by the useFormState hook
  formData: FormData
): Promise<ActionResult> {
  const username = formData.get("username")?.toString();

  if (!checkIfValidUsername(username)) {
    console.error("Invalid username");
    return {
      error: "Invalid username",
    };
  }

  const password = formData.get("password")?.toString();

  if (!checkIfValidPassword(password)) {
    console.error("Invalid password");
    return {
      error: "Invalid password",
    };
  }

  // get user from db
  let existingUser;
  try {
    existingUser = await getUser(username as string);
    if (existingUser.data === null) {
      console.error("Username doesn't exist");
      return {
        error: "Username doesn't exist",
      };
    }
  } catch (error) {
    const errorData = error as PostgrestError;

    console.error("An error occurred while fetching user:", error);
    // if code: 'PGRST116', return a more user-friendly error message
    if (errorData.code === "PGRST116") {
      return {
        error: "Username doesn't exist",
      };
    }
    return {
      error: "An error occurred while fetching user",
    };
  }

  // compare password
  try {
    const validPassword = await bcrypt.compare(
      password as string,
      existingUser.data!.password
    );
    if (!validPassword) {
      console.error("Incorrect password");
      return {
        error: "Incorrect password",
      };
    }
  } catch (error) {
    console.error("An error occurred while comparing password:", error);
    return {
      error: "An error occurred while comparing password",
    };
  }

  // create token
  try {
    await createToken(username as string);
  } catch (error) {
    console.error("An error occurred while creating token:", error);
    return {
      error: "An error occurred while creating token",
    };
  }

  return redirect("/");
}
