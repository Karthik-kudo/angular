import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "Cricket Score Checker – Live Scoreboard",
  description: "Live cricket scores, full scorecards, batting & bowling figures for T20, ODI, and Test matches.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-6xl mx-auto px-4 py-6">
          {children}
        </main>
        <footer className="border-t border-gray-200 bg-white mt-12 py-6 text-center text-sm text-gray-400">
          <p>🏏 Cricket Score Checker &mdash; Built with Next.js &amp; Tailwind CSS</p>
          <p className="text-xs mt-1 text-gray-300">Live scores update every 7 seconds</p>
        </footer>
      </body>
    </html>
  );
}
