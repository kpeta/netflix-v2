import { redirect } from "next/navigation";
import { removeToken } from ".";

export default function logout() {
  removeToken();
  return redirect("/");
}
