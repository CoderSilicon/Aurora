"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Calendar,
  Folder,
  FolderSearch2,
  LayoutDashboard,
  ChevronLeft,
  ChevronRight,
  LockIcon,
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";
import gsap from "gsap";
import Aurora from "@/assets/Aurora.svg";
import { useIsMobile } from "@/hooks/use-mobile";

const Sidebar = () => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 1024; // Collapse if width < 1024px (iPad and below)
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const [isMobile, setIsMobile] = useState<boolean | undefined>(false);
  const [isMobileMenu, setIsMobileMenu] = useState<boolean | undefined>(false);
  const [isPaid, setIsPaid] = useState(false); // You can change this to true to test
  const sidebarRef = useRef(null);
  const logoRef = useRef(null);
  const itemsRef = useRef(null);
  const mobileButtonRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const isActive = (href: string) => pathname === href;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true); // mobile: hide sidebar
      } else {
        setIsMobile(false); // desktop: show sidebar
      }
    };

    handleResize(); // initial check

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut", duration: 0.5 },
    });

    tl.to(sidebarRef.current, { width: isCollapsed ? "5rem" : "20rem" }, 0)
      .to(logoRef.current, { scale: isCollapsed ? 0.8 : 1, opacity: 1 }, 0)
      .to(itemsRef.current, { opacity: 1 }, 0.1);
  }, [isCollapsed]);

  useEffect(() => {
    const activeTab = document.querySelector(".active-tab");
    if (activeTab) {
      gsap.fromTo(
        activeTab,
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [pathname]);
  useEffect(() => {
    if (mobileButtonRef.current) {
      gsap.fromTo(
        mobileButtonRef.current,
        { rotate: 0, scale: 1 },
        {
          rotate: isMobileMenu ? 180 : 0,
          scale: 1.1,
          duration: 0.3,
          ease: "power2.out",
        }
      );
    }
  }, [isMobileMenu]);
  useEffect(() => {
    if (mobileMenuRef.current) {
      if (isMobileMenu) {
        gsap.fromTo(
          mobileMenuRef.current,
          { y: -50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
        );
      } else {
        gsap.to(mobileMenuRef.current, {
          y: -50,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        });
      }
    }
  }, [isMobileMenu]);

  const NavItems = [
    {
      index: 1,
      href: "/journal",
      logo: LayoutDashboard,
      label: "Home",
      locked: false,
    },
    {
      index: 2,
      href: "/journal/gallery",
      logo: Folder,
      label: "My Gallery",
      locked: false,
    },
    {
      index: 3,
      href: "/journal/hub",
      logo: FolderSearch2,
      label: "JœrHub",
      locked: true,
    }, // locked
    {
      index: 4,
      href: "/journal/calendar",
      logo: Calendar,
      label: "Calendar",
      locked: true,
    },
  ];

  return (
    <nav className="relative z-50">
      {!isMobile && ( // Desktop only
        <>
          <div className="absolute top-6 -right-4 z-50">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="bg-[#0D0F14] rounded-xl p-2 z-[60] cursor-pointer absolute top-6 -right-2  "
              style={{ transform: "translateY(-50%)" }}
            >
              {isCollapsed ? (
                <ChevronRight className="w-5 h-5 text-white" />
              ) : (
                <ChevronLeft className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
          {/* Sidebar */}
          
            <div
              ref={sidebarRef}
              className="h-screen w-80 bg-[#0D0F14] overflow-hidden rounded-tr-4xl rounded-br-4xl "
            >
              {/* Arrow Toggle */}

              {/* Logo */}
              <div
                ref={logoRef}
                className="flex items-center justify-center px-4 py-6 gap-3"
              >
                <Image
                  src={Aurora}
                  alt="Logo"
                  width={isCollapsed ? 40 : 50}
                  height={isCollapsed ? 40 : 50}
                  className="transition-all duration-300"
                />
                {!isCollapsed && (
                  <h1 className="text-3xl lexend-400 text-zinc-50 tracking-wide">
                    Aurora
                  </h1>
                )}
              </div>

              {/* Separator */}
              {!isCollapsed && (
                <div className="flex justify-center items-center mb-6">
                  <div className="w-20 h-1.5 rounded-full bg-white/20 backdrop-blur-sm shadow-lg border border-white/10" />
                </div>
              )}

              {/* Items */}
              <ul
                ref={itemsRef}
                className="flex flex-col gap-4 px-4 lexend-400 ">
                <h3
                  className={`text-white text-xs lexend-400 select-none ${isCollapsed ? "hidden" : ""}`}
                >
                  NAVIGATION
                </h3>
                {
                  
                  NavItems.map((item) => {
                    const locked = item.locked && !isPaid;
                    return (
                      <Link
                        key={item.index}
                        href={locked ? "#" : item.href}
                        className={`relative group block ${locked ? "pointer-events-none" : ""} `}
                      >
                        <div
                          className={`flex items-center  gap-3 py-2 px-4 relative transition-all duration-300 rounded-l-[10px]
                    ${
                      isActive(item.href) && !locked
                        ? "active-tab bg-white text-zinc-800 "
                        : "text-muted-foreground hover:bg-zinc-800"
                    }
                    ${locked ? "opacity-50 cursor-not-allowed" : ""}
                  `}
                        >
                          {/* Right curve */}
                          {isActive(item.href) && !locked && (
                            <div
                              className="absolute right-[-20px] top-0 h-full w-5"
                              style={{
                                backgroundColor: "#fff",
                                zIndex: "1",
                              }}
                            />
                          )}

                          {/* Content */}
                          <item.logo className="w-5 h-5 z-10" />
                          {!isCollapsed && (
                            <p className="z-10 flex items-center gap-1">
                              {item.label}
                              {locked && (
                                <span className="ml-1">
                                  <LockIcon className="w-4 h-4 text-muted-foreground" />
                                </span>
                              )}
                            </p>
                          )}
                        </div>
                      </Link>
                    );
                  })
                }
              </ul>
            </div>
          
        </>
      )}
      {isMobile && (
        <>
          <button
            ref={mobileButtonRef}
            onClick={() => setIsMobileMenu(!isMobileMenu)}
            className="rounded-xl p-2 z-50 cursor-pointer fixed top-4 left-4"
          >
            {!isMobileMenu ? (
              <Menu className="w-5 h-5" />
            ) : (
              <X className="w-5 h-5" />
            )}
          </button>

          {isMobileMenu && (
            <div
              className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm flex items-center justify-center"
              onClick={() => setIsMobileMenu(!isMobileMenu)}
              ref={mobileMenuRef}
            >
              <div
                className="bg-[#181A20] border-2 border-zinc-700 rounded-2xl p-8 w-11/12 max-w-xs shadow-lg flex flex-col gap-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Image
                    src={Aurora}
                    alt="Logo"
                    width={40}
                    height={40}
                    className="transition-all duration-300"
                  />
                  <h1 className="text-2xl lexend-400 text-zinc-50 tracking-wide">
                    Aurora
                  </h1>
                </div>
                <ul className="flex flex-col gap-4 lexend-400">
                  {NavItems.map((item) => {
                    const locked = item.locked && !isPaid;
                    return (
                      <Link
                        key={item.index}
                        href={locked ? "#" : item.href}
                        className={`flex items-center gap-3 py-2 px-4 rounded-lg transition-all duration-200 ${
                          isActive(item.href) && !locked
                            ? "bg-white text-zinc-800"
                            : "text-muted-foreground hover:bg-zinc-800"
                        } ${locked ? "opacity-50 pointer-events-none" : ""}`}
                        onClick={() => setIsMobileMenu(false)}
                      >
                        <item.logo className="w-5 h-5" />
                        <span className="flex items-center gap-1">
                          {item.label}
                          {locked && (
                            <LockIcon className="w-4 h-4 text-muted-foreground ml-1" />
                          )}
                        </span>
                      </Link>
                    );
                  })}
                </ul>
              </div>
            </div>
          )}
        </>
      )}
    </nav>
  );
};

export default Sidebar;
