"use client";
import React from "react";
import {
  Award,
  CircleArrowUp,
  CircleCheck,
  CircleDot,
  EllipsisIcon,
  FileChartPieIcon,
} from "lucide-react";
import { PieChart, Pie, Cell } from "recharts";

const RankingCard = () => {
  return (
    <div className="rank w-full relative">
      <div className="relative z-10 bg-[#111] dark:bg-[#0d0d0d] p-6 rounded-2xl border border-gray-700 dark:border-gray-600 shadow-inner hover:shadow-lg transition-shadow duration-300 h-72">
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
  );
};

const JournalStatsCard = () => {
  const StatsCards = () => {
    return (
      <div className="flex justify-between items-center w-full mt-3 gap-3">
        {[
          { icon: CircleDot, count: "54", label: "Journals'" },
          { icon: CircleArrowUp, count: "27", label: "Drafts" },
          { icon: CircleCheck, count: "27", label: "Submitted" },
        ].map((item, index) => (
          <div
            key={index}
            className="flex flex-col justify-center items-center border-2 border-zinc-800 dark:border-zinc-100 p-4 rounded-2xl gap-1 w-1/3"
          >
            <item.icon />
            <h1 className="text-xl font-semibold text-black dark:text-gray-100">
              {item.count}
            </h1>
            <p className="text-xs text-zinc-900 dark:text-gray-300">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    );
  };

  const ProgressBar = () => {
    return (
      <div className="flex items-center justify-between my-3 w-full">
        <div className="flex w-full h-3 rounded-2xl overflow-hidden">
          <div className="h-full bg-zinc-950" style={{ width: "41%" }} />
          <div className="h-full bg-zinc-700" style={{ width: "59%" }} />
        </div>
      </div>
    );
  };

  return (
    <div className="border border-zinc-800 dark:border-zinc-100 py-6 px-4 rounded-2xl lexend-400 max-w-[22rem] md:max-w-[22rem] w-full h-72 flex flex-col justify-between">
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-sm">Broad Summary</h1>
        <EllipsisIcon />
      </div>

      {/* Summary numbers */}
      <div className="flex justify-between items-center m-3">
        {[
          {
            number: "54",
            text: "Journals",
            subtext: "for as total",
          },
          {
            number: "12",
            text: "Drafts",
            subtext: "that are waiting",
          },
        ].map((item, index, array) => (
          <React.Fragment key={index}>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl text-black dark:text-gray-100">
                {item.number}
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-300">
                {item.text} <br />
                {item.subtext}
              </p>
            </div>
            {index < array.length - 1 && (
              <div className="h-9 w-0.5 bg-zinc-950 rounded-2xl" />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Progress bar */}
      <ProgressBar />

      {/* Stats cards */}
      <StatsCards />
    </div>
  );
};

const JournalProgressChart = () => {
  const data = [
    { name: "Journals", value: 300 },
    { name: "Drafts", value: 600 },
  ];

  const COLORS = ["#7c3aed", "#f472b6"]; // Aurora colors

  return (
    <div className="max-w-[22rem] md:max-w-[22rem] w-full h-72 backdrop-blur-xl bg-[#0d0f14]/70 border border-white/10 shadow-lg rounded-2xl p-6 flex flex-col justify-between">
      {/* Header */}
      <div className="flex justify-between items-center w-full mb-2">
        <h1 className="lexend-400 text-base text-zinc-200">
          Journals' Analysis
        </h1>
        <FileChartPieIcon className="text-zinc-300" />
      </div>

      {/* Chart */}
      <div className="flex justify-center items-center">
        <PieChart width={140} height={140}>
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={55}
            innerRadius={25}
            paddingAngle={4}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </div>

      {/* Legends */}
      <div className="flex justify-around w-full text-sm text-zinc-300">
        {data.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            {entry.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default function JournalCards() {
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 p-4 place-items-center">
      {/* RankingCard */}

      <RankingCard />
    
      {/* JournalStatsCard */}
 
        <JournalStatsCard />


      {/* JournalProgressChart — fixed */}
    
        <JournalProgressChart />
     
    </div>
  );
}
