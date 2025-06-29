// app/(dashboard)/layout.js  or app/dashboard/layout.js
import AppSidebar from "@/components/journal/AppSidebar";

export const metadata = {
  title: "Your Dashboard  :)",

  description:
    "Your personal dashboard for managing your journal and related features.",
};

export default function DashboardLayout({ children }) {
  return (
    <>
      <div>
        <AppSidebar />
        {children}
      </div>
    </>
  );
}
