import { Award, BookOpen, CheckCircle, FileEdit, MoreHorizontal } from "lucide-react";
import React from "react";

const JournalCards = () => {

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 px-4 py-8">
      {/* Ranking */}
      <div className="rank max-w-xl relative">
        <div className="absolute -top-4 -left-4 w-16 h-16 rotate-12 bg-gradient-to-br from-[#1f1f1f] to-[#3b3b3b] rounded-md shadow-2xl z-0 opacity-60" />
        <div className="absolute -bottom-6 -right-6 w-24 h-24 -rotate-12 bg-gradient-to-tr from-[#2a2a2a] to-[#444] rounded-md shadow-lg z-0 opacity-50" />
        <div className="relative z-10 bg-[#111] dark:bg-[#0d0d0d] p-6 rounded-2xl border border-gray-700 dark:border-gray-600 shadow-inner hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-lg font-semibold uppercase tracking-wider text-gray-300 dark:text-gray-200 flex items-center gap-2">
            <Award className="w-5 h-5 text-slate-50 dark:text-slate-400" />
            Ranking
          </h3>
          <div className="flex items-center justify-center mt-6">
            <div className="bg-[#1a1a1a] dark:bg-[#222] text-zinc-50 px-6 py-4 rounded-xl text-4xl font-extrabold tracking-widest josefinSlab-700 shadow-md">
              QUELITE
            </div>
          </div>
          <div className="mt-6 text-left">
            <h1 className="text-2xl font-bold text-gray-200 dark:text-gray-100 lexend-400">
              You are an
            </h1>
            <p className="mt-2 text-gray-400 dark:text-gray-300 josefinSlab-400 text-lg leading-snug">
              ⚡ A shadow-walker in disguise — <br />
              the elite soul in a mortal frame.
            </p>
          </div>
        </div>
      </div>
      {/* Journal Stats*/}
          
    </div>
  );
};

export default JournalCards;
