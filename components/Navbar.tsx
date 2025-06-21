"use client";

import { useState } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { Button } from "../components/ui/button";
import { UserButton, SignInButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import Aurora from "@/assets/Aurora.svg";

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isSignedIn } = useAuth();

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="lexend-300">
      {/* Floating Menu */}
      {isMenuOpen && (
        <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 w-[90%] max-w-sm z-50">
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/90 backdrop-blur-xl shadow-2xl p-5 space-y-4">
            {["Work", "About", "Contact"].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block text-center font-medium text-zinc-800 dark:text-zinc-200 hover:text-zinc-600 dark:hover:text-zinc-400 transition"
              >
                {item}
              </Link>
            ))}

            {isSignedIn ? (
              <div className="flex justify-center items-center gap-4">
                <Link
                  href="/journal"
                  className="text-sm font-medium text-zinc-800 dark:text-zinc-200 hover:text-purple-500 transition"
                >
                  Dashboard
                </Link>
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "w-8 h-8",
                    },
                  }}
                />
              </div>
            ) : (
              <div className="flex justify-center">
                <SignInButton>
                  <Button className="rounded-full px-5 py-2 text-sm font-medium">
                    Sign In
                  </Button>
                </SignInButton>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bottom Navbar */}
      <nav className="fixed bottom-5 left-1/2 transform -translate-x-1/2 w-[92%] max-w-3xl z-50">
        <div className="bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 px-6 py-3 rounded-full flex items-center justify-between shadow-[0_8px_30px_rgb(0,0,0,0.35)] border-2 border-zinc-800 dark:border-zinc-700">
          {/* Left: Logo + Menu Toggle */}
          <div className="flex items-center gap-3">
            <div className="text-lg font-black tracking-wide">
              <Image
                src={Aurora}
                className="font-bold"
                alt="Logo"
                width={40}
                height={40}
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-full p-2"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>

          {/* Center: Pinned Items */}
          <div className="flex items-center gap-6 text-sm font-medium">
            <Link
              href="#work"
              className="hover:text-zinc-600 dark:hover:text-zinc-400 transition"
            >
              Work
            </Link>
            <Link
              href="#about"
              className="hover:text-zinc-600 dark:hover:text-zinc-400 transition"
            >
              About
            </Link>
            <Link
              href="#contact"
              className="bg-zinc-800 dark:bg-zinc-700 text-white px-4 py-1.5 rounded-full hover:bg-zinc-700 dark:hover:bg-zinc-600 transition-all"
            >
              Contact
            </Link>
          </div>

          {/* Right: Dark Mode Toggle */}
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="text-zinc-800 dark:text-zinc-200 hover:text-zinc-600 dark:hover:text-zinc-400 rounded-full p-2"
            >
              {isDark ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </nav>
    </div>
  );
}
