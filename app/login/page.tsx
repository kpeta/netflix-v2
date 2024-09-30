import login from "@/server/auth/login";
import AuthForm from "@/components/AuthForm";

export default function LoginPage() {
  return (
    <AuthForm formTitle="Log In" formAction={login} buttonText="Continue" />
  );
}
