import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "../styles/globals.css";
import Navbar from "../components/Navbar";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Harsh Verma — Full Stack Developer",
  description:
    "Portfolio of Harsh Verma, a Full Stack Developer building high-performance web applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <body
        className="min-h-full flex flex-col"
        style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif" }}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
