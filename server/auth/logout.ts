"use server";
import { redirect } from "next/navigation";
import { removeToken } from ".";

export default async function logout() {
  await removeToken();
  return redirect("/");
}
