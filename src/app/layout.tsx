import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Transport Cost Calculator",
  description: "Calculate shipping costs based on weight and dimensions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <NavBar />
        <main className="pt-16"> {/* Add padding-top to account for the NavBar height */}
          {children}
        </main>
      </body>
    </html>
  );
}
