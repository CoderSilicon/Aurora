import type React from "react";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "@/font/font.scss";

import "./globals.css";
import Navbar from "../components/Navbar";
import { Toaster } from "sonner";
import { usePathname } from "next/navigation";

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
  
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/journal");

  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`dark:bg-[#12161d] bg-slate-50 `}>
          {!isDashboard && <Navbar />}
          {children}
          <Toaster richColors />
        </body>
      </html>
    </ClerkProvider>
  );
}
