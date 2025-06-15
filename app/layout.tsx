import type React from "react";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "@/font/font.scss";

import "./globals.css";
import Navbar from "@/components/Navbar";


export const metadata: Metadata = {
  title: "Thynkr | Your Writing Sanctuary",
  description:
    "Capture your thoughts, organize your ideas, and unleash your creativity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`dark:bg-[#12161d] bg-slate-50 `}>
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
