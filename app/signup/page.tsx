"use client";
import signup from "@/server/auth/signup";
import { useFormState } from "react-dom";

export default async function Page() {
  const [state, formAction] = useFormState(signup, null);

  return (
    <>
      <h1>Create an account</h1>
      <form action={formAction}>
        <label htmlFor="username">Username</label>
        <input name="username" id="username" />
        {/* ... */}
        <p aria-live="polite" className="sr-only">
          {state?.error}
        </p>
        <br />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        <br />
        <button>Continue</button>
      </form>
    </>
  );
}
