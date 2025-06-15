"use client"

import WelcomeCard from "@/components/journal/Intro-Card";
import JournalCards from "@/components/journal/Journal-Cards";
import Topbar from "@/components/JournalNavbar";
import Sidebar from "@/components/Sidebar";
import React from "react";

const page = () => {
 

  return (
    <>
      <main className="flex ">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gray-100 dark:bg-[#12161d] min-h-screen">
        <Topbar />
        <WelcomeCard />
        <JournalCards />
      </div>
    </main>
    
    </>
  );
};

export default page;
