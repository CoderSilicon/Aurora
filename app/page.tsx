"use client";
import React, { useRef } from "react";
import FeaturePage from "@/components/pages/Feature";
import FaqsPage from "@/components/pages/Faqs";
import HeroPage from "@/components/pages/Hero";
import HowItWorks from "@/components/pages/How-it-works";

export default function LandingPage() {
  return (
    <div className=" bg-white dark:bg-gray-950 transition-colors duration-300 py-10">
      <HeroPage />

      <FeaturePage />

      <HowItWorks />
      
      <FaqsPage />
      
    </div>
  );
}
