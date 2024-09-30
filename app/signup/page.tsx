"use client";

import signup from "@/server/auth/signup";
import { useFormState } from "react-dom";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { verifyCaptcha } from "@/server/actions/recaptcha";
import ResponsiveMenuIcon from "@/components/header/icons/ResponsiveMenuIcon";
import styles from "../../styles/Login.module.css";
import WarningIcon from "@/components/icons/WarningIcon";
import CloseIcon from "@/components/icons/CloseIcon";

const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "20px",
  paddingTop: "100px",
};

const iconStyle: React.CSSProperties = {
  width: "48px",
  height: "48px",
};

const formContainerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  width: "310px",
};

const inputContainerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  boxSizing: "border-box",
  width: "100%",
  backgroundColor: "rgb(34 34 34)",
  padding: "20px",
  borderRadius: "8px",
  border: "1px solid rgb(50 50 50)",
};

const inputTextStyle: React.CSSProperties = {
  fontSize: "16px",
  fontWeight: 800,
};

const inputFieldStyle: React.CSSProperties = {
  fontSize: "15px",
  padding: "6px",
  color: "white",
  borderRadius: "8px",
  border: "1px solid rgb(89 89 89)",
  backgroundColor: "rgb(55 55 55)",
};

const headerTextStyle: React.CSSProperties = {
  fontSize: "35px",
  fontWeight: 900,
  marginTop: "10px",
};

const buttonStyle: React.CSSProperties = {
  padding: "10px",
  width: "100%",
  color: "white",
  fontWeight: 900,
  fontSize: "15px",
  borderRadius: "8px",
  border: "1px solid rgb(50 50 50)",
};

const errorMessageContainerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: "16px",
  borderRadius: "8px",
  padding: "10px",
  backgroundColor: "darkred",
  border: "1px solid rgb(100, 10, 10)",
  boxSizing: "border-box",
  width: "310px",
};

const errorMessageTextContainerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
};

const closeButtonStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "transparent",
  border: "none",
  cursor: "pointer",
};

export default function Page() {
  const [state, formAction] = useFormState(signup, null);
  const [isVerified, setIsverified] = useState<boolean>(false);
  const [errorClosed, setErrorClosed] = useState<boolean>(false);

  async function handleCaptchaSubmission(token: string | null) {
    // Server function to verify captcha
    await verifyCaptcha(token)
      .then(() => setIsverified(true))
      .catch(() => setIsverified(false));
  }

  function handleCloseError() {
    setErrorClosed(true);
  }

  function handleFormSubmission() {
    setErrorClosed(false);
  }

  return (
    <div style={containerStyle}>
      <ResponsiveMenuIcon style={iconStyle} />

      <div style={headerTextStyle}>Sign Up</div>

      {state?.error && !errorClosed && (
        <div style={errorMessageContainerStyle}>
          <div style={errorMessageTextContainerStyle}>
            <WarningIcon />
            {state?.error}
          </div>
          <button style={closeButtonStyle} onClick={() => handleCloseError()}>
            <CloseIcon />
          </button>
        </div>
      )}

      <form
        style={formContainerStyle}
        autoComplete="off"
        onSubmit={() => handleFormSubmission()}
        action={formAction}
      >
        <div style={inputContainerStyle}>
          <label style={inputTextStyle} htmlFor="username">
            Username
          </label>
          <input
            style={inputFieldStyle}
            autoComplete="off"
            name="username"
            id="username"
          />

          <label style={inputTextStyle} htmlFor="password">
            Password
          </label>
          <input
            style={inputFieldStyle}
            autoComplete="off"
            type="password"
            name="password"
            id="password"
          />
        </div>

        <ReCAPTCHA
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
          onChange={handleCaptchaSubmission}
        />

        <button
          style={{
            ...buttonStyle,
            cursor: isVerified ? "pointer" : "not-allowed",
            transition: isVerified ? "background-color 0.3s ease" : "none",
          }}
          className={!isVerified ? styles.disabledButton : styles.button}
          type="submit"
          disabled={!isVerified}
        >
          Continue
        </button>
      </form>
    </div>
  );
}
