import login from "@/server/auth/login";
import AuthForm from "@/components/AuthForm";
import { getToken } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const token = await getToken();

  if (token) {
    redirect("/");
  }

  return <AuthForm formTitle="Log In" formAction={login} buttonText="Log In" />;
}
