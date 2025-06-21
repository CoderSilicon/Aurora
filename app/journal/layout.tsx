import { Sidebar } from "lucide-react";
import type React from "react";

export default function JournalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className={`dark:bg-[#12161d] bg-slate-50 `}>
    <Sidebar />
    {children}</div>;
}
