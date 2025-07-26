"use client";

import { useState } from "react";
import type { MoodData } from "@/types/analytics";
import {
  getWeeklyMoodData,
  getMonthlyMoodData,
  calculateMoodStats,
  getMostCommonMoodData,
  getChartMoodData,
} from "@/functions/moodAnalyticsData";

import { FaCalendar, FaBars, FaX, FaHeart, FaChartLine } from "react-icons/fa6";

// Circular Progress Component - Minimalist Black & White
const CircularProgress = ({
  percentage,
  size = 200,
  strokeWidth = 8,
}: {
  percentage: number;
  size?: number;
  strokeWidth?: number;
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = `${
    (percentage / 100) * circumference
  } ${circumference}`;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(0, 0, 0, 0.1)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#bwGradient)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
        {/* Black & White Gradient definition */}
        <defs>
          <linearGradient id="bwGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#000000" />
            <stop offset="50%" stopColor="#404040" />
            <stop offset="100%" stopColor="#000000" />
          </linearGradient>
        </defs>
      </svg>
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-4xl mb-2 ">
          {getMostCommonMoodData(getWeeklyMoodData())?.emoji}
        </div>
        <div className="text-3xl font-bold text-black mb-1">{percentage}%</div>
        <div className="text-sm text-gray-600 text-center">Most Common</div>
      </div>
    </div>
  );
};

// Chart Bar Component - Minimalist
const ChartBar = ({
  mood,
  maxCount,
  index,
}: {
  mood: MoodData;
  maxCount: number;
  index: number;
}) => {
  const height = Math.max(((mood.count || 1) / maxCount) * 120, 20);

  // Different shades of gray for variety
  const grayShades = [
    "from-gray-800 to-gray-700",
    "from-gray-700 to-gray-600",
    "from-gray-600 to-gray-500",
    "from-gray-500 to-gray-400",
    "from-gray-900 to-gray-800",
    "from-gray-400 to-gray-300",
  ];

  const gradientClass = grayShades[index % grayShades.length];

  return (
    <div className="flex flex-col items-center gap-2 group cursor-pointer lexend-400">
      <div className="text-xs text-gray-700 font-medium">{mood.count}</div>
      <div
        className={`w-8 rounded-t-lg bg-gradient-to-t ${gradientClass} transition-all duration-300 hover:shadow-lg hover:scale-105 relative overflow-hidden`}
        style={{ height: `${height}px` }}
      >
        {/* Subtle highlight effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="text-lg ">{mood.emoji}</div>
      <div className="text-xs text-gray-600 text-center max-w-16 truncate">
        {mood.label}
      </div>
    </div>
  );
};

export default function MoodAnalytics() {
  const [data, setData] = useState<MoodData[]>(getWeeklyMoodData());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showInsights, setShowInsights] = useState(false);

  const stats = calculateMoodStats(data);
  const mostCommonMood = getMostCommonMoodData(data);
  const chartData = getChartMoodData(data);
  const maxCount = Math.max(...chartData.map((item) => item.count || 1));

  const handleLoadWeeklyData = () => {
    setData(getWeeklyMoodData());
    setIsMenuOpen(false);
  };

  const handleLoadMonthlyData = () => {
    setData(getMonthlyMoodData());
    setIsMenuOpen(false);
  };

  return (
    <div className="relative my-1 lexend-400">
      {/* Main Chart Container - Minimalist Design */}
      <div className=" rounded-3xl border-2 border-zinc-900 p-8 w-full max-w-4xl ml-16">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text- font-bold  lexend-400 flex items-center gap-3">
            Mood Analytics
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => setShowInsights(!showInsights)}
              className="p-3 hover:bg-gray-200 rounded-xl transition-colors text-gray-600 hover:text-gray-900"
              aria-label="Toggle insights"
            >
              <FaChartLine />
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-3 hover:bg-gray-200 rounded-xl transition-colors text-gray-600 hover:text-gray-900"
              aria-label="Open menu"
            >
              <FaBars />
            </button>
          </div>
        </div>

        {/* Insights Panel */}
        {showInsights && (
          <div className="mb-8 p-6 bg-gradient-to-r from-gray-100 to-gray-50 rounded-2xl border border-gray-300 shadow-inner">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-lg">
              <span className="text-gray-600">✨</span>
              Mood Insights
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-gray-700 text-sm">
                  Average Score:{" "}
                  <span className="text-black font-semibold">
                    {stats.averageScore}/10
                  </span>
                </p>
                <p className="text-gray-700 text-sm">
                  Total Entries:{" "}
                  <span className="text-black font-semibold">
                    {stats.totalEntries}
                  </span>
                </p>
              </div>
              <div>
                <p className="text-gray-700 text-sm">{stats.moodTrend}</p>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Side - Circular Progress */}
          <div className="flex flex-col items-center gap-6">
            {mostCommonMood && (
              <>
                <CircularProgress percentage={mostCommonMood.percentage} />
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {mostCommonMood.label}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {mostCommonMood.count} times this period
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Right Side - Chart */}
          <div className="flex-1 w-full">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Other Moods
              </h3>
              <p className="text-gray-600 text-sm">Frequency distribution</p>
            </div>

            <div className="flex items-end justify-between gap-4 px-4 h-48">
              {chartData.length === 0 ? (
                <div className="w-full text-center py-8 text-gray-500">
                  No additional mood data available
                </div>
              ) : (
                chartData.map((mood, index) => (
                  <ChartBar
                    key={mood.moodId}
                    mood={mood}
                    maxCount={maxCount}
                    index={index}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Popup Menu */}
      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-40"
            onClick={() => setIsMenuOpen(false)}
          />

          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-white to-gray-100 rounded-3xl shadow-2xl border-2 border-gray-300 p-8 w-full max-w-md z-50 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <span className="inline-block w-3 h-3 bg-gradient-to-tr from-gray-600 to-black rounded-full animate-pulse" />
                Controls
              </h3>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 hover:bg-gray-200 rounded-lg transition text-gray-600 hover:text-gray-900"
                aria-label="Close menu"
              >
                <FaX />
              </button>
            </div>

            <div className="mb-8">
              <h4 className="font-medium mb-4 text-gray-800 text-lg">
                Time Periods
              </h4>
              <div className="flex justify-around items-center gap-4">
                <button
                  onClick={handleLoadWeeklyData}
                  className="flex flex-col items-center justify-center gap-2 px-8 py-6 bg-gradient-to-br from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 rounded-xl border-2 border-gray-300 shadow-sm transition"
                >
                  <FaBars size={24} className="text-gray-700" />
                  <span className="text-sm font-medium text-gray-800">
                    Weekly
                  </span>
                </button>

                <button
                  onClick={handleLoadMonthlyData}
                  className="flex flex-col items-center justify-center gap-2 px-8 py-6 bg-gradient-to-br from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 rounded-xl border-2 border-gray-400 shadow-sm transition"
                >
                  <FaCalendar size={24} className="text-gray-800" />
                  <span className="text-sm font-medium text-gray-900">
                    Monthly
                  </span>
                </button>
              </div>
            </div>

            <div className="bg-gray-100 rounded-xl p-4 border-2 border-gray-300">
              <h4 className="font-medium mb-3 text-gray-800">Current Period</h4>
              <div className="text-center">
                <div className="font-bold text-2xl text-gray-900">
                  {mostCommonMood?.label || "N/A"}
                </div>
                <div className="text-gray-600 text-sm">Most frequent mood</div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
