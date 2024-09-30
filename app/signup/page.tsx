import signup from "@/server/auth/signup";
import AuthForm from "@/components/AuthForm";

export default function SignupPage() {
  return (
    <AuthForm formTitle="Sign Up" formAction={signup} buttonText="Continue" />
  );
}
