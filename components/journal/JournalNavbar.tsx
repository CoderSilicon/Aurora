"use client";

import { useUser, useClerk } from "@clerk/nextjs";
import { ChevronDown, DollarSign, LogOut, SearchIcon, Settings } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const Topbar = () => {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();
  const [open, setOpen] = useState(false);
  const iconClusterRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate icon cluster when mount
    gsap.fromTo(
      iconClusterRef.current,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  useEffect(() => {
    // Animate dropdown
    if (open) {
      gsap.fromTo(
        menuRef.current,
        { opacity: 0, y: -8, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [open]);

  if (!user) return null;

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between p-4 md:p-9 sticky top-4 z-30">
      <div>
        <h1 className="hidden md:block font-bold lexend-400 text-4xl dark:text-white">Your Dashboard</h1>
      </div>

      {/* Icon Cluster */}
      <div
        ref={iconClusterRef}
        className="flex items-center justify-center md:justify-end gap-2 md:gap-4 mt-4 md:mt-0 bg-[#0D0F14] px-4 py-2 rounded-2xl"
      >
        <button className="px-4 py-2 text-white text-xl font-bold rounded-2xl hover:bg-neutral-900 transition-colors">
          +
        </button>

        <button className="p-2 text-white rounded-2xl hover:bg-neutral-900 transition-colors">
          <SearchIcon className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        <button className="p-2 text-white rounded-2xl hover:bg-neutral-900 transition-colors">
          <DollarSign className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 p-1 rounded-full hover:bg-neutral-900 transition-colors"
          >
            <Image
              src={user.imageUrl}
              alt="User Avatar"
              width={32}
              height={32}
              className="rounded-full border-2 border-neutral-800"
            />
            <ChevronDown className="w-4 h-4 text-white" />
          </button>

          {open && (
            <div
              ref={menuRef}
              className="absolute right-0 mt-3 w-44 bg-[hsl(200,27%,2%)] rounded-2xl text-white shadow-lg overflow-hidden"
            >
              <button
                onClick={() => {
                  openUserProfile();
                  setOpen(false);
                }}
                className="flex w-full px-4 py-3 items-center gap-3 hover:bg-neutral-900 transition-colors text-sm"
              >
                <Settings className="w-5 h-5" />
                Manage Account
              </button>

              <button
                onClick={() => signOut()}
                className="flex w-full px-4 py-3 items-center gap-3 text-red-400 hover:bg-red-900/30 transition-colors text-sm"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
