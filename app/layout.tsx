import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Netflix v2",
  description: "Next version of Netflix",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
