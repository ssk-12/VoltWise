import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import Navigation from "@/components/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Electricity Demand Projection",
  description: "AI-driven system for forecasting electricity demand for Delhi's power system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        
        <main className="p-4">{children}</main>
        <Navigation />
      </body>
    </html>
  );
}

