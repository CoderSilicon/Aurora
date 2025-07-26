import ProjectAnalytics from "@/components/journal/AppAnalytics";
import MoodAnalytics from "@/components/journal/AppMoodAnalytics";
import AppStatCards from "@/components/journal/AppStatCards";
import { Plus } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <>
      <div id="VIEWPORT">
        <div id="HEAD" className="flex justify-between items-center">
          <div className="flex justify-start items-start flex-col mb-4 mx-7 my-2
          ">
            <h1 className="lexend-400 text-left text-4xl my-1 sebian">Dashboard</h1>
            <p className="text-muted-foreground text-md sebian">
              Plan,  Priortize,  Accomplish your tasks with ease
            </p>
          </div>
          <div className="flex gap-3 lexend-400 mx-4">
            <a
              href="/journal/new"
              className="flex items-center px-6 py-4 bg-primary text-white  hover:bg-primary/90 transition rounded-full"
            >
              <Plus className="inline mr-2" />
              New Journal
            </a>
            <a
              href="/journal/history"
              className="flex items-center px-6 py-4 bg-secondary text-primary rounded-full hover:bg-secondary/80 transition"
            >
              View History
            </a>
          </div>
        </div>

        <AppStatCards />
       
          <ProjectAnalytics />
          <MoodAnalytics />
        
      </div>
    </>
  );
};

export default page;
