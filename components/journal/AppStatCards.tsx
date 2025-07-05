import { GoArrowUpRight } from "react-icons/go";
import { FaTrophy } from "react-icons/fa";
import { GiRank2 } from "react-icons/gi";
import React from "react";

const AppStatCards = () => {
  const totalJournals = 54;
  const submissions = 12;
  const drafts = totalJournals - submissions;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full lexend-400 ">
      {/* Ranking Card */}
      <div className="relative mx-1 max-w-90 h-60 p-6 rounded-3xl border-2 border-zinc-950 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black  overflow-hidden group">
        {/* Geometric Isometric Overlay */}
        <div className="absolute -top-6 -left-6 w-32 h-32 rounded-2xl bg-zinc-900 rotate-45 border-2 border-zinc-950 shadow-md"></div>
        <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-xl bg-zinc-900 rotate-45 border-2 border-zinc-950 shadow-md opacity-70"></div>

        {/* Top Row */}
        <div className="flex justify-between items-center relative z-10">
          <span className="bg-white text-gray-800 border border-black p-2 rounded-full shadow hover:scale-110 transition-transform">
            <FaTrophy />
          </span>
          <span className="uppercase text-gray-300 tracking-wide text-sm font-semibold">
            Rank
          </span>
        </div>

        {/* Main Number */}
        <div className="flex flex-col justify-center items-center text-5xl my-6 font-light tracking-wider text-white relative z-10 drop-shadow">
          <GiRank2 className="mb-2" size={56} />
          <h1 className="text-4xl text-center">Lumière</h1>
        </div>
      </div>

      {/* Card 1 */}
      <div className="relative p-9 mx-1 max-w-90 h-60 bg-gradient-to-r from-zinc-950 to-zinc-900 rounded-4xl text-white">
        <div className="flex justify-between items-center w-full">
          <span>Total Journals</span>
          <span className="bg-white rounded-full text-black p-2">
            <GoArrowUpRight />
          </span>
        </div>
        <div className="text-6xl my-3 tracking-wide">{totalJournals}</div>
        <div className="flex justify-start items-center gap-3 my-8 text-xs ">
          <div className="bg-zinc-800 px-3 py-1 rounded-full">7 Day Streak</div>
          <div className="bg-zinc-800 px-3 py-1 rounded-full">12% Growth</div>
        </div>
      </div>

      {/* Card 2 */}
      <div className="relative p-9 mx-1 max-w-90 h-60 border-3 border-zinc-950 rounded-4xl">
        <div className="flex justify-between items-center w-full">
          <span>Submission</span>
          <span className="bg-white rounded-full text-black p-2 border-1 border-black">
            <GoArrowUpRight />
          </span>
        </div>
        <div className="text-6xl my-3 tracking-wide">{submissions}</div>

        {/* Replacing with a subtle motivational quote */}
        <div className="text-muted-foreground text-sm tracking-tight font-light ">
          "Your words shape your legacy."
        </div>
      </div>

      {/* Card 3 */}
      <div className="relative p-9 mx-1 max-w-90 h-60 border-3 border-zinc-950 rounded-4xl">
        <div className="flex justify-between items-center w-full">
          <span> Drafts</span>
          <span className="bg-white rounded-full text-black p-2 border-1 border-black">
            <GoArrowUpRight />
          </span>
        </div>
        <div className="text-6xl my-3 tracking-wide">{drafts}</div>
        <p className="text-muted-foreground text-sm tracking-tight font-light">
          "Every great work was once a rough draft."
        </p>
      </div>
    </div>
  );
};

export default AppStatCards;
