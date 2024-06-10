import Footer from "@/components/Footer";
import Header from "@/components/header/Header";
import type { Metadata } from "next";
import "../styles/globals.css";
import { Open_Sans } from "next/font/google";

const font = Open_Sans({
  weight: "500",
  subsets: ["latin"],
});

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
    <html lang="en" className={font.className}>
      <body style={bodyStyle}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
