"use server";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { checkIfValidUsername, checkIfValidPassword } from "@/utils/validation";
import { createUser } from "../modifiers/users";
import { createToken } from ".";
import { getUser } from "../fetchers/users";
import { PostgrestError } from "@supabase/supabase-js";

interface ActionResult {
  error: string;
}

export default async function signup(
  prevState: any, //this argument is not used in this function, but it is required by the useActionState hook
  formData: FormData
): Promise<ActionResult> {
  const username = formData.get("username")?.toString();

  if (!checkIfValidUsername(username)) {
    console.error("Invalid username");
    return {
      error: "Invalid username",
    };
  }

  let existingUser;
  try {
    existingUser = await getUser(username as string);
    if (existingUser.data !== null) {
      console.error("Username already exists");
      return {
        error: "Username already exists",
      };
    }
  } catch (error) {
    const errorData = error as PostgrestError;

    // if code: 'PGRST116', username isn't taken
    if (errorData.code !== "PGRST116") {
      console.error(
        "An error occurred while checking if username exists:",
        error
      );

      return {
        error: "An error occurred while checking if username exists",
      };
    }
  }

  const password = formData.get("password")?.toString();

  if (!checkIfValidPassword(password)) {
    console.error("Invalid password");
    return {
      error: "Invalid password",
    };
  }

  let hashedPassword;

  try {
    const salt = await bcrypt.genSalt(10); // Generate salt with cost factor 10
    hashedPassword = await bcrypt.hash(password as string, salt); // Hash the password with the generated salt
  } catch (error) {
    console.error(`Failed to hash password: ${error}`);
    return {
      error: `Failed to hash password: ${error}`,
    };
  }

  // add user to db
  try {
    await createUser(username as string, hashedPassword);
  } catch (error) {
    console.error(`Failed to create user in db: ${error}`);
    return {
      error: `Failed to create user in db: ${error}`,
    };
  }

  // create JWT for the user
  try {
    await createToken(username as string);
  } catch (error) {
    console.error(`Failed to create token: ${error}`);
    return {
      error: `Failed to create token: ${error}`,
    };
  }

  return redirect("/");
}
