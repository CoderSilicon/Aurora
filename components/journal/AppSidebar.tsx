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
} from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
    { href: "/journal/gallery", icon: <GalleryThumbnails />, label: "My Gallery" },
    { href: "/hub", icon: <Server />, label: "Jœrhub" },
    { href: "/garden", icon: <Leaf />, label: "Neuro Garden" },
    { href: "/lane", icon: <Timer />, label: "Memory Lane" },
    { href: "/calendar", icon: <Calendar />, label: "Calendar" },
  ];

  useEffect(() => {
    // Animate button letters
    gsap.fromTo(
      letterRefs.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, ease: "power2.out", duration: 0.3, stagger: 0.06 }
    );
  }, [buttonText]);

  useEffect(() => {
    if (sidebarRef.current) {
      if (menu) {
        // Slide sidebar in
        gsap.to(sidebarRef.current, {
          x: 0,
          ease: "power2.inOut",
          duration: 0.5,
          onComplete: () => {
            // Animate sidebar item labels after sidebar appears
            gsap.fromTo(
              itemRefs.current,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, ease: "power2.out", duration: 0.4, stagger: 0.1 }
            );
          },
        });
      } else {
        // Slide sidebar out
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
      {/* Menu Button */}
      <div className="relative">
        <div className="absolute -top-6.5 z-50 w-20 bg-zinc-950 rounded-full p-3 text-center mx-6 text-xl text-white lexend-400">
          <button onClick={() => setMenu(!menu)} className="relative overflow-hidden">
            {buttonText.split("").map((char, idx) => (
              <span
                key={idx}
                ref={(el) => {letterRefs.current[idx] = el}}
                style={{ display: "inline-block" }}
              >
                {char}
              </span>
            ))}
          </button>
        </div>

        {/* Sidebar Panel */}
        <div
          ref={sidebarRef}
          className="fixed top-0 left-0 h-full w-80 z-40 bg-zinc-950 text-white -translate-x-full"
        >
          <div id="navigation" className="flex flex-col justify-center items-center h-full">
            <ul className="flex flex-col justify-center items-start space-y-6">
              {sideItems.map((item, idx) => (
                <Link key={idx} href={item.href} className="flex gap-4 items-center group">
                  {pathname.includes(item.href) ? (
                    <>
                      <div className="text-black bg-white rounded-full p-3">{item.icon}</div>
                      <div className="text-xl lexend-400 font-semibold text-black bg-white rounded-full py-3 px-6">
                        {item.label}
                      </div>
                    </>
                  ) : (
                    <div className="group flex items-center space-x-3 cursor-pointer hover:bg-white hover:text-black rounded-full transition-colors duration-200 px-3 py-2">
                      <span>{item.icon}</span>
                      <span
                        className="text-xl lexend-400 font-semibold"
                        ref={(el) => {itemRefs.current[idx] = el}}
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


      {/* Toolbar */}
      <div className="flex items-center space-x-4 bg-zinc-950 rounded-full p-1 pr-2 mx-4">
        {[
          { href: "#", icon: <Plus />, className: "bg-white text-black px-9 py-2 rounded-full" },
          { href: "#", icon: <GalleryThumbnails />, className: "text-white p-2 rounded-full" },
          { href: "#", icon: <Server />, className: "text-white p-2 rounded-full" },
        ].map((item, idx) => (
          <Link key={idx} href={item.href} className={item.className}>
            {item.icon}
          </Link>
        ))}

        {/* Dark Mode Button */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="text-white p-2 rounded-full hover:bg-white hover:text-black transition"
        >
          {darkMode ? <Moon /> : <Sun />}
        </button>

        <UserButton />
      </div>
    </nav>
  );
};

export default AppSidebar;
