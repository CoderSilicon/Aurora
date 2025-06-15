"use client";
import React, { useRef } from "react";
import FeaturePage from "@/components/pages/Feature";
import FaqsPage from "@/components/pages/Faqs";
import HeroPage from "@/components/pages/Hero";
import HowItWorks from "@/components/pages/How-it-works";
import UseCases from "@/components/pages/Use-Cases";
import Testimonial from "@/components/pages/Testimonials";

export default function LandingPage() {
  return (
    <div className=" bg-white dark:bg-[#12161d] transition-colors duration-300 py-10">
      <HeroPage />

      <FeaturePage />

      <HowItWorks />
      
      <UseCases/>
      
      <Testimonial/>
            <FaqsPage />

      
    </div>
  );
}
