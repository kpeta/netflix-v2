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
  title: "Netflix Redesigned",
  description: "Redesigned version of Netflix",
};

const bodyStyle: React.CSSProperties = {
  backgroundColor: "rgb(23 23 23)",
  margin: 0,
  color: "white",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={font.className}>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body style={bodyStyle}>
        <Header />
        <div>{children}</div>
        <Footer />
      </body>
    </html>
  );
}
