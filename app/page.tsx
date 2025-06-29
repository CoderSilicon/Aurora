"use client";
import React, { useRef } from "react";
import FeaturePage from "@/components/layout/Feature";

import HeroPage from "@/components/layout/Hero";
import HowItWorks from "@/components/layout/How-it-works";
import UseCases from "@/components/layout/Use-Cases";
import Testimonial from "@/components/layout/Testimonials";
import Footer from "@/components/layout/Footer";

export default function LandingPage() {
  return (
    <div className=" bg-white dark:bg-[#12161d] ">
      <HeroPage />

      <FeaturePage />

      <HowItWorks />
      
      <UseCases/>
      
      <Testimonial/>
           
           <Footer/>
      
    </div>
  );
}
