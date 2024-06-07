import Footer from "@/components/Footer";
import Header from "@/components/header/Header";
import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Netflix v2",
  description: "Next version of Netflix",
};

const bodyStyle: React.CSSProperties = {
  paddingTop: "100px",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={bodyStyle}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
