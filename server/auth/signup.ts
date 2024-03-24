"use server";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import {
  checkIfValidUsername,
  checkIfValidPassword,
  checkIfUserExists,
} from "@/utils/validation";
import { createUser } from "../actions/users";
import { createToken } from ".";

interface ActionResult {
  error: string;
}

export default async function signup(
  formData: FormData
): Promise<ActionResult> {
  const username = formData.get("username")?.toString();

  if (!checkIfValidUsername(username)) {
    console.error("Invalid username");
    return {
      error: "Invalid username",
    };
  }

  if ((await checkIfUserExists(username as string)) === true) {
    console.error("Username already exists");
    return {
      error: "Username already exists",
    };
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
    await createToken({ username: username as string });
  } catch (error) {
    console.error(`Failed to create token: ${error}`);
    return {
      error: `Failed to create token: ${error}`,
    };
  }

  return redirect("/login");
}
