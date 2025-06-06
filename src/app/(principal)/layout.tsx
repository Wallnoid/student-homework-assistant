'use client'

import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Sidebar } from "../../shared/components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} overflow-hidden bg-gray-50 antialiased flex flex-row items-center  h-screen  min-h-screen font-[family-name:var(--font-geist-sans)]`}
      >
        <Sidebar />

        <div className="w-full h-screen  overflow-auto ">
          {children}

        </div>
      </body>
    </html>
  );
}
