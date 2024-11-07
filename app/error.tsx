"use client";

import { useEffect } from "react";
import WarningIcon from "@/components/icons/WarningIcon";
import { pageContainer } from "@/styles/PageContainer";

const titleContainerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  gap: "10px",
  color: "red",
  alignItems: "center",
};

const terminalStyle: React.CSSProperties = {
  backgroundColor: "#2D2D2D",
  color: "#C5C6C7",
  fontFamily: "monospace",
  padding: "10px",
  borderRadius: "5px",
  whiteSpace: "pre-wrap",
  overflowX: "auto",
  margin: "10px 0",
};

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global Error:", error);
  }, [error]);

  return (
    <main>
      <div style={pageContainer()}>
        <div style={titleContainerStyle}>
          <WarningIcon />
          <h2>An unexpected error has occurred</h2>
        </div>

        <details>
          <summary>Show Error Details</summary>
          <div style={terminalStyle}>{error.message}</div>
          <button onClick={() => reset()}>Retry</button>
        </details>
      </div>
    </main>
  );
}
