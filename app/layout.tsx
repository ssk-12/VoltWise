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
        <main className="p-4 pt-20">{children}</main>
        <div className="fixed bottom-4 sm:left-1/2 transform -translate-x-1/2 right-2">
          <div className="group relative flex items-center justify-center">
            <div className="transition-all duration-300 scale-75 group-hover:scale-100">
              <Navigation />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
