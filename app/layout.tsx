import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Electricity Demand Projection",
  description: "Visualize and analyze electricity demand trends.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="bg-gray-800 text-white p-4">
          <h1 className="text-xl">Electricity Demand Projection</h1>
        </header>
        {children}
        <footer className="bg-gray-800 text-white p-4">
          <p>© 2023 Electricity Demand Projection. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
