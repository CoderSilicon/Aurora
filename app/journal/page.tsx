"use client"

import WelcomeCard from "@/components/journal/Intro-Card";
import JournalCards from "@/components/journal/Journal-Cards";
import Topbar from "@/components/journal/JournalNavbar";
import React from "react";

const page = () => {
 

  return (
    <>
     
        <Topbar />
        <WelcomeCard />
        <JournalCards />
      

    
    </>
  );
};

export default page;
