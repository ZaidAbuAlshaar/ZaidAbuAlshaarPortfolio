import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zaid Abu Alshaar",
  description: "Full-Stack Developer & AI Engineer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
