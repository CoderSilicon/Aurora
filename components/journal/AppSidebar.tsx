"use client";
import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import {
  Calendar,
  GalleryThumbnails,
  LayoutDashboardIcon,
  Leaf,
  Plus,
  Server,
  Timer,
  Moon,
  Sun,

  X,
} from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Aurora from "@/assets/Aurora.svg"
import Image from "next/image";

const AppSidebar = () => {
  const [menu, setMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const buttonText = menu ? "Close" : "Menu";
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const pathname = usePathname();

  const sideItems = [
    { href: "/journal", icon: <LayoutDashboardIcon />, label: "Dashboard" },
    {
      href: "/journal/gallery",
      icon: <GalleryThumbnails />,
      label: "My Gallery",
    },
    { href: "/hub", icon: <Server />, label: "Jœrhub" },
    { href: "/garden", icon: <Leaf />, label: "Neuro Garden" },
    { href: "/lane", icon: <Timer />, label: "Memory Lane" },
    { href: "/calendar", icon: <Calendar />, label: "Calendar" },
  ];

  useEffect(() => {
    gsap.fromTo(
      letterRefs.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, ease: "power2.out", duration: 0.3, stagger: 0.06 }
    );
  }, [buttonText]);

  useEffect(() => {
    if (sidebarRef.current) {
      if (menu) {
        gsap.to(sidebarRef.current, {
          x: 0,
          ease: "power2.inOut",
          duration: 0.5,
          onComplete: () => {
            gsap.fromTo(
              itemRefs.current,
              { opacity: 0, y: 20 },
              {
                opacity: 1,
                y: 0,
                ease: "power2.out",
                duration: 0.4,
                stagger: 0.1,
              }
            );
          },
        });
      } else {
        gsap.to(sidebarRef.current, {
          x: "-100%",
          ease: "power2.inOut",
          duration: 0.5,
        });
      }
    }
  }, [menu]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <nav className="relative flex items-center justify-between my-6">
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className="fixed top-0 left-0 h-full w-full z-30 bg-zinc-950 text-white -translate-x-full"
      >
        {/* Close (X) Button */}
        <button
          onClick={() => setMenu(false)}
          className="absolute top-6 right-6 text-white hover:text-black bg-zinc-800 hover:bg-white rounded-full p-2 transition-colors z-40"
          aria-label="Close sidebar"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="flex h-full w-screen justify-center gap-3">

        <div
          id="navigation"
          className="flex flex-col justify-center items-center h-full"
        >
          <ul className="flex flex-col justify-center items-start space-y-6">
            {sideItems.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                className="flex gap-4 items-center group"
              >
                {pathname.includes(item.href) ? (
                  <>
                    <div className="text-black bg-white rounded-full p-3">
                      {item.icon}
                    </div>
                    <div className="text-xl font-semibold text-black bg-white rounded-full py-3 px-6">
                      {item.label}
                    </div>
                  </>
                ) : (
                  <div className="group flex items-center space-x-3 cursor-pointer hover:bg-white hover:text-black rounded-full transition-colors duration-200 px-3 py-2">
                    <span>{item.icon}</span>
                    <span
                      className="text-xl font-semibold"
                      ref={(el) => {
                        itemRefs.current[idx] = el;
                      }}
                    >
                      {item.label}
                    </span>
                  </div>
                )}
              </Link>
            ))}
          </ul>
        </div>
        </div>
      </div>

      {/* Floating Toolbar */}
      <div className="w-full flex justify-center items-center">
        <div className="sticky top-3 flex items-center space-x-2 sm:space-x-4 border-2 border-zinc-950 rounded-full p-1 pr-2 z-20 ">
          {/* Plus Button */}
          <Link
            href="#"
            className="bg-black text-white px-6 py-1 sm:px-9 sm:py-2 mx-1 sm:mx-2 rounded-full flex items-center justify-center"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
          </Link>

          {/* Menu Button */}
          <div className="relative flex flex-col justify-center items-center">
            <button className="relative overflow-hidden  text-lg sm:text-xl p-2 sm:p-3 text-center">
              <span
                ref={(el) => {
                  letterRefs.current[0] = el;
                }}
                onClick={() => setMenu(!menu)}
                className="cursor-pointer flex flex-col justify-center items-center"
                aria-label={buttonText}
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                >
                  <line
                    x1="6"
                    y1="10"
                    x2="26"
                    y2="10"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <line
                    x1="6"
                    y1="22"
                    x2="26"
                    y2="22"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </button>
          </div>

          {/* Gallery Button */}
          <Link
            href="#"
            className="dark:text-white p-2 sm:p-3 rounded-full flex items-center justify-center"
          >
            <GalleryThumbnails className="w-4 h-4 sm:w-5 sm:h-5" />
          </Link>

          {/* Server Button */}
          <Link
            href="#"
            className="dark:text-white p-2 sm:p-3 rounded-full flex items-center justify-center"
          >
            <Server className="w-4 h-4 sm:w-5 sm:h-5" />
          </Link>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="dark:text-white p-2 sm:p-3 rounded-full hover:bg-white hover:text-black transition flex items-center justify-center"
          >
            {darkMode ? (
              <Moon className="w-4 h-4 sm:w-5 sm:h-5" />
            ) : (
              <Sun className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </button>

          <UserButton />
        </div>
      </div>
    </nav>
  );
};

export default AppSidebar;
