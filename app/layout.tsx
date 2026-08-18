import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kapil & Somya — Wedding Invitation",
  description: "Join Kapil and Somya to celebrate their wedding in Jodhpur, 26 November 2026.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
