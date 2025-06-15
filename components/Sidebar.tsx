"use client";
import {
  Calendar,
  DoorOpen,
  HelpCircle,
  LayoutDashboard,
  LineChart,
  Menu,
  Server,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Sidebar = () => {
  const pathname = usePathname();
  const [isPaid, setisPaid] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState(false); // toggle state

  const navItems = [
    { icon: <LayoutDashboard />, text: "Dashboard", href: "/journal" },
    { icon: <Calendar />, text: "Calendar", href: "/journal/calender" },
    { icon: <Server />, text: "Hub", href: "/journal/hub" },
    { icon: <LineChart />, text: "Statistics", href: "/journal/statistics" },
  ];

  return (
    <>
      {/* Hamburger Button */}
      <div className="lg:hidden p-4 fixed top-0 left-0 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-black dark:text-white"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0
          transition-transform duration-300
          lg:static fixed z-40 top-0 left-0
          h-screen w-80
          bg-white dark:bg-[#12161d]
          border-r border-gray-200 dark:border-gray-800
          shadow-lg lg:shadow-none
        `}
      >
        <nav className="h-[97vh] md:min-h-screen flex-col flex justify-between  md:m-0   ">
          {/* Section 1 */}
          <section className="Sec1">
            <div className="logo">
              <div className="flex justify-center items-center gap-5 mt-9">
                <div className="relative w-12 h-12">
                  <div className="absolute bottom-0 left-0 w-12 h-12 border-4 border-black dark:border-white rounded-full" />
                  <div className="absolute bottom-1 left-1 w-9 h-9 border-4 border-black dark:border-white rounded-full" />
                  <div className="absolute bottom-2 left-2 w-6 h-6 border-4 border-black dark:border-white rounded-full" />
                </div>
                <h1 className="text-center josefinSlab-700 text-4xl font-bold text-black dark:text-white">
                  Thynkr
                </h1>
              </div>
            </div>

            {/* Nav List */}
            <div className="flex flex-col justify-between w-full p-12">
              <ul className="flex flex-col gap-4">
                {navItems.map((item, index) => (
                  <div className="relative ml-8" key={index}>
                    {pathname === item.href && (
                      <div className="absolute -left-5 top-1/2 -translate-y-1/2 w-2 h-8 rounded-3xl bg-black dark:bg-white shadow-inner" />
                    )}
                    <Link
                      href={item.href}
                      className="flex items-center gap-3 lexend-400 cursor-pointer text-black dark:text-white"
                    >
                      <span>{item.icon}</span>
                      <span>{item.text}</span>
                    </Link>
                  </div>
                ))}
              </ul>
            </div>

            {/* General Section */}
            <div className="flex flex-col justify-between w-full ml-9">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-2 lexend-400">
                GENERAL
              </div>
              <ul className="text-sm space-y-2 text-black dark:text-white">
                {[
                  { icon: <HelpCircle />, text: "Help" },
                  { icon: <DoorOpen />, text: "Logout" },
                ].map((item, index) => (
                  <div className="relative ml-10 mt-3" key={index}>
                    <li className="flex items-center gap-3 lexend-400 cursor-pointer">
                      {item.icon}
                      <span>{item.text}</span>
                    </li>
                  </div>
                ))}
              </ul>
            </div>
          </section>

          {/* Section 2 - Payment Card */}
          <section className="Sec2">
            {isPaid && (
              <div className="mx-4 mb-8 p-8 rounded-2xl bg-gradient-to-br from-gray-700 via-slate-800 to-zinc-900 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
                <div className="relative z-10 lexend-400">
                  <div className="text-3xl font-extrabold tracking-tight">
                    Pro Mode
                  </div>
                  <div className="text-lg mt-1 text-white/90 font-medium lexend-300">
                    Why upgrade?
                  </div>
                  <p className="mt-4 text-sm text-white/80 leading-relaxed lexend-200">
                    Unlock features that are not visible in normal mode. Get
                    access to ... You'll find out soon!
                  </p>
                  <button className="mt-6 w-full py-3 rounded-3xl bg-slate-50 text-slate-900 hover:bg-slate-950 hover:text-slate-50 hover:font-bold transition-all duration-300 hover:scale-105">
                    Upgrade to Premium
                  </button>
                </div>
              </div>
            )}
          </section>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
