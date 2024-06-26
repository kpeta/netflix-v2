"use client";
import signup from "@/server/auth/signup";
import { useFormState } from "react-dom";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { verifyCaptcha } from "@/server/actions/recaptcha";
import Link from "next/link";

export default function Page() {
  const [state, formAction] = useFormState(signup, null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [isVerified, setIsverified] = useState<boolean>(false);

  async function handleCaptchaSubmission(token: string | null) {
    // Server function to verify captcha
    await verifyCaptcha(token)
      .then(() => setIsverified(true))
      .catch(() => setIsverified(false));
  }

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
        <ReCAPTCHA
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
          ref={recaptchaRef}
          onChange={handleCaptchaSubmission}
        />
        <button type="submit" disabled={!isVerified}>
          Continue
        </button>
      </form>
    </>
  );
}
