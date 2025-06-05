"use client"
import { useState } from "react"
import { Moon, Sun, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { UserButton, SignInButton, useAuth } from "@clerk/nextjs"

export default function BottomNavbar() {
  const [isDark, setIsDark] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { isSignedIn } = useAuth()

  const toggleDarkMode = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle("dark")
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <div className={isDark ? "dark" : ""}>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed bottom-24 left-4 right-4 z-40">
          <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-xl">
            <div className="flex flex-col gap-4">
              <a
                href="#"
                className="text-slate-700 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400 transition-colors text-sm font-medium py-2"
              >
                About
              </a>
              <a
                href="#"
                className="text-slate-700 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400 transition-colors text-sm font-medium py-2"
              >
                Projects
              </a>
              <a
                href="#"
                className="text-slate-700 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400 transition-colors text-sm font-medium py-2"
              >
                Process
              </a>
              {isSignedIn ? (
                <a
                  href="/dashboard"
                  className="text-slate-700 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400 transition-colors text-sm font-medium py-2"
                >
                  Go to Dashboard
                </a>
              ) : (
                <SignInButton>
                  <Button className="bg-amber-500  text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl mt-2">
                    Sign In
                  </Button>
                </SignInButton>
              )}
              <Button className="border-2 border-amber-500 from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl mt-2">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-full px-6 py-3 flex items-center gap-6 shadow-xl hover:shadow-2xl transition-all duration-300">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-10 h-10 relative flex items-center justify-center">
              <div className="absolute w-9 h-9 border-2 border-black dark:border-amber-400 rounded-full"></div>
              <div className="absolute w-6 h-6 border-2 border-black dark:border-amber-400 rounded-full"></div>
              <div className="absolute w-3 h-3 border-2 border-black dark:border-amber-400 rounded-full"></div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <a
              href="#"
              className="text-slate-700 dark:text-slate-200 hover:text-black dark:hover:text-white transition-colors text-sm font-medium relative group"
            >
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5  bg-gradient-to-r from-amber-500 to-amber-600 group-hover:w-full transition-all duration-200"></span>
            </a>
            <a
              href="#"
              className="text-slate-700 dark:text-slate-200 hover:text-black dark:hover:text-white transition-colors text-sm font-medium relative group"
            >
              Doc
              <span className="absolute -bottom-1 left-0 w-0 h-0.5  bg-gradient-to-r from-amber-500 to-amber-600 group-hover:w-full transition-all duration-200"></span>
            </a>
            <a
              href="#"
              className="text-slate-700 dark:text-slate-200 hover:text-black dark:hover:text-white transition-colors text-sm font-medium relative group"
            >
              Pricing
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-amber-600 group-hover:w-full transition-all duration-200"></span>
            </a>
            {isSignedIn && (
              <a
                href="/dashboard"
                className="text-slate-700 dark:text-slate-200 hover:text-black dark:hover:text-white transition-colors text-sm font-medium relative group"
              >
                Dashboard
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-amber-600 group-hover:w-full transition-all duration-200"></span>
              </a>
            )}
          </div>

          {/* Contact Button & Dark Mode Toggle - Desktop */}
          <div className="hidden md:flex items-center gap-3">
            {isSignedIn ? (
              <div className="flex items-center gap-3">
                <Button className="bg-amber-500 text-white dark:hover:text-black px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105">
                  Contact Us
                </Button>
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
              <div className="flex items-center gap-3">
                <Button className="border-2 border-amber-500 text-black dark:text-white hover:bg-amber-500 dark:hover:bg-amber-500 dark:hover:text-white hover:text-white bg-white dark:bg-gray-950/10 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105">
                  Contact Us
                </Button>
                <SignInButton>
                  <Button className="bg-amber-500 dark:hover:text-black   text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105">
                    Sign In
                  </Button>
                </SignInButton>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full p-2 transition-all duration-200"
            >
              {isDark ? <Sun className="h-4 w-4 text-amber-500" /> : <Moon className="h-4 w-4 text-slate-600" />}
            </Button>
          </div>

          {/* Mobile Menu Button & Dark Mode Toggle */}
          <div className="md:hidden flex items-center gap-2">
            {isSignedIn && (
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    userButtonAvatarBox: "w-8 h-8",
                  },
                }}
              />
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full p-2 transition-all duration-200"
            >
              {isDark ? <Sun className="h-4 w-4 text-amber-500" /> : <Moon className="h-4 w-4 text-slate-600" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              className="text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full p-2 transition-all duration-200"
            >
              {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </nav>
    </div>
  )
}
