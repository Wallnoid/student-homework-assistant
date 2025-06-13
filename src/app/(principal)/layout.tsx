'use client'

import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import "../animation.css";
import { Sidebar } from "../../shared/components/Sidebar";
import { Toaster } from "react-hot-toast";
import useBlockNavigation from "@/shared/hooks/usePreventNav.hook";

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
  const hasUnsavedChanges = true; // o tu lógica para saber si bloquear
  useBlockNavigation('Tienes cambios sin guardar, ¿quieres salir?', hasUnsavedChanges);
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} overflow-hidden bg-gray-50 antialiased flex flex-row items-center  h-screen  min-h-screen font-[family-name:var(--font-geist-sans)]`}
      >
        <Toaster />
        <Sidebar />

        <div className="w-full h-screen  overflow-auto ">
          {children}

        </div>
      </body>
    </html>
  );
}
