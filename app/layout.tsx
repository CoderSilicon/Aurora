import type React from "react";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "@/font/font.scss";
import "./globals.css";
import CN from "@/components/CN";

export const metadata: Metadata = {
  title: "Aurora",
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
      <html lang="en" >
        <body className={`dark:bg-[#12161d] bg-slate-50 `}>
          <CN />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
