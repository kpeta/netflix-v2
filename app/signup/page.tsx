import signup from "@/server/auth/signup";
import AuthForm from "@/components/AuthForm";
import { getToken } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function SignupPage() {
  const token = await getToken();

  if (token) {
    redirect("/");
  }

  return (
    <AuthForm formTitle="Sign Up" formAction={signup} buttonText="Sign Up" />
  );
}
