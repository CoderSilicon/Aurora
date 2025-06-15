"use client";
import { useUser, useClerk } from "@clerk/nextjs";
import { ChevronDown, DollarSign, LogOut, SearchIcon, Settings } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const Topbar = () => {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();
  const [open, setOpen] = useState(false);
  if (!user) return null;

  return (
    <div className="flex items-center justify-between p-4 md:p-9 sticky top-3 ">
      <div>
        <h1 className="hidden md:block font-bold lexend-400 text-4xl">Your Dashboard</h1>
      </div>
      <div className="w-full md:w-auto">
        <ul className="flex items-center justify-center md:justify-end gap-2 md:gap-4">
          <div className="relative group">
            <div className="relative px-6 md:px-9 py-2 rounded-full bg-zinc-950 dark:bg-gray-600 ring-1 ring-gray-900/5 leading-none flex items-center border-1 border-slate-950">
              <span className="josefinSlab-700 text-xl md:text-2xl font-bold text-white dark:text-black transition-colors">
                +
              </span>
            </div>
          </div>

          <div className="rounded-full p-2 md:p-3  dark:bg-white bg-zinc-950">
            <SearchIcon className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <div className="rounded-full p-2 md:p-3  dark:bg-white bg-zinc-950">
            <DollarSign className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <div className="relative inline-block text-left">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 rounded-full  dark:hover:bg-slate-800 transition p-2 bg-zinc-950 dark:bg-white "
            >
              <Image
                src={user.imageUrl}
                alt="User Avatar"
                width={32}
                height={32}
                className="rounded-full "
              />
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-44 dark:bg-slate-50 bg-gray-900 rounded-xl shadow-lg  z-50 text-sm">
                <button
                  onClick={() => {
                    openUserProfile();
                    setOpen(false);
                  }}
                  className="flex w-full px-4 py-2 items-center gap-2 dark:text-gray-800 text-gray-100 hover:bg-gray-700 dark:hover:bg-slate-800 rounded-xl"
                >
                  <Settings className="w-4 h-4 text-white" />
                  Manage Account
                </button>

                <button
                  onClick={() => signOut()}
                  className="flex w-full px-4 py-2 items-center gap-2 text-red-600 dark:hover:bg-red-50 hover:bg-red-900/20 rounded-xl"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Topbar;
