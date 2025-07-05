"use client";

import { useState } from "react";
import type { AnalyticsData } from "@/types/analytics";
import {
  getWeeklyData,
  getMonthlyData,
  calculateStats,
  getBarStyle,
  validateDataPoint,
} from "@/functions/userAnalyticsData";

import { FaCalendar, FaBars, FaX } from "react-icons/fa6";

export default function ProjectAnalytics() {
  // Initialize with default weekly data
  const [data, setData] = useState<AnalyticsData[]>(getWeeklyData());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [customValue, setCustomValue] = useState("");
  const [customLabel, setCustomLabel] = useState("");
  const [customStatus, setCustomStatus] = useState<"active" | "inactive">(
    "active"
  );
  const [error, setError] = useState<string>("");

  // Calculate stats using utility function
  const stats = calculateStats(data);
  const maxValue = stats.peak;

  // Handle preset data loading
  const handleLoadWeeklyData = () => {
    setData(getWeeklyData());
    setIsMenuOpen(false);
  };

  const handleLoadMonthlyData = () => {
    setData(getMonthlyData());
    setIsMenuOpen(false);
  };

  return (
    <div className="relative my-3 lexend-400">
      {/* Main Chart Container */}
      <div className="bg-white rounded-3xl border-2 border-zinc-950  p-6 w-full max-w-2xl mx-auto">
        {/* Header with Menu Button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium text-gray-900 lexend-400">
            Project Analytics
          </h2>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
            aria-label="Open menu"
          >
            <FaBars />
          </button>
        </div>

        {/* Chart */}
        <div className="relative">
          {/* Bars Container */}
          <div className="flex items-end justify-between gap-3 px-4 mb-4">
            {data.length === 0 ? (
              <div className="w-full text-center py-8 text-gray-500">
                No data available. U don't any btw.
              </div>
            ) : (
              data.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center gap-2 relative group"
                >
                  {/* Bar */}
                  <div
                    className="w-12 rounded-full transition-all duration-300 hover:opacity-80 relative cursor-pointer "
                    style={getBarStyle(item, index, maxValue)}
                  >
                    {/* Value tooltip on hover */}
                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                      {item.value}
                    </div>
                  </div>

                  {/* Label */}
                  <span className="text-sm font-medium text-gray-600 uppercase select-none">
                    {item.label}
                  </span>
                </div>
              ))
            )}
          </div>

          {/* Summary stats */}
        </div>
      </div>

      {/* Popup Menu */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Popup Container */}
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl shadow-2xl border border-gray-200 p-8 w-full max-w-md z-50 max-h-[90vh] overflow-y-auto isometric">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <span className="inline-block w-3 h-3 bg-gradient-to-tr from-zinc-500 to-zinc-950 rounded-full animate-pulse" />
                Controls & Legend
              </h3>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
                aria-label="Close menu"
              >
                <FaX />
              </button>
            </div>

            {/* Pattern Legend */}
            <div className="mb-8">
              <h4 className="font-medium mb-4 text-gray-800 text-lg">
                Pattern Legend
              </h4>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full shadow-inner ring-2 ring-zinc-800 bg-zinc-900"></div>
                  <span className="text-gray-700 text-sm flex-1">
                    Active{" "}
                    <span className="text-zinc-950 font-medium">
                      (Solid Green)
                    </span>
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div
                    className="w-8 h-8 rounded-full shadow-inner ring-2 ring-gray-400"
                    style={{
                      backgroundColor: "#f3f4f6",
                      backgroundImage: `repeating-linear-gradient(45deg, #000000, #000000 1px, transparent 1px, transparent 4px)`,
                    }}
                  ></div>
                  <span className="text-gray-700 text-sm flex-1">
                    Inactive{" "}
                    <span className="text-gray-500 font-medium">
                      (Slanted Black Lines)
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* Preset Controls */}
            <div className="mb-8">
              <h4 className="font-medium mb-4 text-gray-800 text-lg">
                Presets
              </h4>
              <div className="flex justify-around items-center">
                <button
                  onClick={handleLoadWeeklyData}
                  className="flex flex-col items-center justify-center gap-1 px-12 py-6 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-300 shadow-sm transition"
                >
                  {/* Weekly icon: Menu (FiMenu) */}
                  <span className="w-6 h-6  flex items-center justify-center">
                    <FaBars size={24} />
                  </span>
                  <span className="text-xs font-medium text-gray-700">
                    Weekly
                  </span>
                </button>

                <button
                  onClick={handleLoadMonthlyData}
                  className="flex flex-col items-center justify-center gap-1 px-12 py-6 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-300 shadow-sm transition"
                >
                  {/* Monthly icon: Calendar (FiCalendar) */}
                  <span className="w-6 h-6  flex items-center justify-center">
                    <FaCalendar size={24} />
                  </span>
                  <span className="text-xs font-medium text-gray-700">
                    Monthly
                  </span>
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-red-600 text-sm bg-red-100 border border-red-300 p-3 rounded-lg">
                {error}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
