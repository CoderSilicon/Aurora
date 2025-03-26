"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Menu, X, Book } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { UserButton, SignInButton, useUser } from "@clerk/nextjs";

export default function Navbar() {
  const { isSignedIn } = useUser();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setIsDarkMode(isDark);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".mobile-menu") && !target.closest(".menu-button")) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleNavigation = () => {
    setIsMobileMenuOpen(false);
  };

  const isActiveRoute = (path: string) => {
    if (path === "/") {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/pricing", label: "Pricing" },
    { href: "/docs", label: "Docs", icon: Book },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-amber-100 dark:border-amber-900/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-amber-600 dark:text-amber-400 josefin-700">
              VM.
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = isActiveRoute(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={handleNavigation}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-amber-600 dark:text-amber-400"
                      : "text-amber-700 dark:text-amber-300 hover:text-amber-600 dark:hover:text-amber-400"
                  }`}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-600 dark:bg-amber-400"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="relative group"
              aria-label="Toggle dark mode"
            >
              <AnimatePresence mode="wait">
                {isDarkMode ? (
                  <motion.div
                    key="moon"
                    initial={{ opacity: 0, rotate: -180 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 180 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="sun"
                    initial={{ opacity: 0, rotate: 180 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -180 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-amber-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                Ctrl + D
              </div>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden menu-button"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              ) : (
                <Menu className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              )}
            </Button>

            {/* Auth Buttons */}
            {isSignedIn ? (
              <div className="hidden md:block">
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8",
                    },
                  }}
                />
              </div>
            ) : (
              <Link href="/sign-in">
                <Button
                  variant="outline"
                  className="hidden md:flex items-center gap-2 border-amber-600 dark:border-amber-500 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-slate-900"
                >
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden mobile-menu"
            >
              <div className="py-4 space-y-4">
                {navLinks.map((link, index) => {
                  const Icon = link.icon;
                  const isActive = isActiveRoute(link.href);
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2, delay: index * 0.1 }}
                    >
                      <Link
                        href={link.href}
                        onClick={handleNavigation}
                        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                          isActive
                            ? "bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400"
                            : "text-amber-700 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-slate-900"
                        }`}
                      >
                        {Icon && <Icon className="h-4 w-4" />}
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
                {!isSignedIn && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2, delay: navLinks.length * 0.1 }}
                  >
                    <Link
                      href="/sign-in"
                      onClick={handleNavigation}
                      className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-amber-600 dark:border-amber-500 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-slate-900"
                    >
                      Sign In
                    </Link>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}