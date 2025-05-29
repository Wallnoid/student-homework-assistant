'use client'

import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { CustomAdminNavBar } from "@/features/admin/components/CustomAdminNavBar";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});



export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} overflow-hidden bg-gray-50 antialiased flex flex-row items-center  h-screen  min-h-screen font-[family-name:var(--font-geist-sans)]`}
            >

                {/* <CustomAdminNavBar /> */}


                <div className="w-full h-screen  overflow-auto bg-gray-50">
                    {children}

                </div>
                <Toaster
                    position="bottom-center"
                />
            </body>
        </html>
    )

}
