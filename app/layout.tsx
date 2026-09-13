import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Somya & Kapil — Wedding Invitation",
  description: "Join Somya and Kapil to celebrate their wedding in Jodhpur, 26 November 2026.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
