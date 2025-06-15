import type React from "react";

export default function JournalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`dark:bg-slate-950 bg-slate-50 `}>{children}</body>
    </html>
  );
}
