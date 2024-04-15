"use client";
import login from "@/server/auth/login";
import { useFormState } from "react-dom";

const initialState = {
  error: "",
};

export default function Page() {
  const [state, formAction] = useFormState(login, initialState);

  return (
    <>
      <h1>Log in</h1>
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
