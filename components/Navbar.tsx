import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import {
  Moon,
  Home,
  Info,
  DollarSign,
  FileText,
  Mail,
  Sun,
  LayoutDashboard,
} from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { UserButton, SignInButton, useUser, SignUpButton } from "@clerk/nextjs";

gsap.registerPlugin(useGSAP);

const Navbar = () => {
  const modeIcon = useRef<HTMLButtonElement>(null);
  const navRef = useRef(null);
  const topLine = useRef<HTMLSpanElement>(null);
  const bottomLine = useRef<HTMLSpanElement>(null);
  const mobileMenuRef = useRef(null);

  const [menu, setMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const { isSignedIn } = useUser();

  const navItems = [
    { name: "HOME", href: "/", logo: <Home className="inline w-5 h-5 ml-2" /> },
    { name: "ABOUT", href: "/about", logo: <Info className="w-5 h-5 ml-2" /> },
    {
      name: "PRICING",
      href: "/pricing",
      logo: <DollarSign className="w-5 h-5 ml-2" />,
    },
    {
      name: "DOCS",
      href: "/docs",
      logo: <FileText className="w-5 h-5 ml-2" />,
    },
    {
      name: "CONTACT",
      href: "/contact",
      logo: <Mail className="w-5 h-5 ml-2" />,
    },
  ];

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    gsap.fromTo(
      modeIcon.current,
      { rotate: 0 },
      { rotate: 360, duration: 0.6, ease: "power2.inOut" }
    );
  };

  useGSAP(() => {
    gsap.from(".desktop-link", {
      opacity: 0,
      y: -20,
      stagger: 0.1,
      duration: 1,
      ease: "power3.out",
    });
  }, []);

  const openMenu = () => {
    setMenu(true);

    // Animate lines into cross
    gsap.to(topLine.current, {
      rotate: 45,
      y: 0,
      duration: 0.4,
      ease: "power2.out",
    });
    gsap.to(bottomLine.current, {
      rotate: -45,
      y: 0,
      duration: 0.4,
      ease: "power2.out",
    });

    gsap.set(mobileMenuRef.current, {
      scale: 0.8,
      opacity: 0,
    });

    gsap.to(mobileMenuRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.4,
      ease: "power3.out",
    });

    gsap.from(".mobile-link", {
      opacity: 0,
      y: 10,
      stagger: 0.1,
      delay: 0.1,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const closeMenu = () => {
    // Animate lines back to burger
    gsap.to(topLine.current, {
      rotate: 0,
      y: -6,
      duration: 0.4,
      ease: "power2.inOut",
    });
    gsap.to(bottomLine.current, {
      rotate: 0,
      y: 6,
      duration: 0.4,
      ease: "power2.inOut",
    });

    gsap.to(mobileMenuRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => setMenu(false),
    });
  };
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
  <nav className="flex justify-between items-center fixed top-3 z-50 w-screen" ref={navRef}>

  {/* Desktop Nav */}
  <div className="hidden md:flex justify-center items-center bg-[#1a1a1a] dark:bg-[#f3f3f3] rounded-full p-2 mx-6 relative shadow-sm">
    
    <ul className="flex">
      {navItems.map((item) => (
        <li key={item.name}>
          <Link
            href={item.href}
            className="desktop-link dark:text-[#f3f3f3] text-[#1a1a1a] hover:bg-[#1a1a1a] dark:hover:bg-[#f3f3f3] hover:text-[#f3f3f3] dark:hover:text-[#1a1a1a] font-medium poppins-400 dark:bg-[#1a1a1a] bg-[#f3f3f3] rounded-4xl py-2 px-4 mx-[1px] transition-colors duration-300"
          >
            {item.name}
          </Link>
        </li>
      ))}
    </ul>

    <div className="w-1 rounded-4xl h-3 bg-[#333333] dark:bg-[#e5e5e5] mx-3" />

    <div className="flex items-center">
      {isSignedIn ? (
        <Link
          href="/journal"
          className="desktop-link flex items-center justify-center text-[#f3f3f3] dark:text-[#1a1a1a] bg-[#1a1a1a] dark:bg-[#f3f3f3] hover:bg-[#333333] dark:hover:bg-[#e5e5e5] hover:text-[#f3f3f3] dark:hover:text-[#1a1a1a] rounded-4xl font-medium poppins-400 px-4 py-2 transition-colors duration-300"
        >
          <LayoutDashboard className="inline w-5 h-5 mr-2" />
        </Link>
      ) : (
        <>
          <SignInButton mode="modal">
            <button className="desktop-link dark:bg-[#1a1a1a] bg-[#f3f3f3] dark:text-[#f3f3f3] text-[#1a1a1a] px-6 py-2 rounded-3xl font-medium poppins-400 mx-1 transition-colors duration-300 hover:bg-[#1a1a1a] dark:hover:bg-[#f3f3f3] hover:text-[#f3f3f3] dark:hover:text-[#1a1a1a]">
              Sign In
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="desktop-link dark:bg-[#1a1a1a] bg-[#f3f3f3] dark:text-[#f3f3f3] text-[#1a1a1a] px-6 py-2 rounded-3xl font-medium poppins-400 mx-1 transition-colors duration-300 hover:bg-[#1a1a1a] dark:hover:bg-[#f3f3f3] hover:text-[#f3f3f3] dark:hover:text-[#1a1a1a]">
              Sign Up
            </button>
          </SignUpButton>
        </>
      )}
    </div>
  </div>

  {/* Mobile Menu Button */}
  <div className="md:hidden flex items-center">
    <button
      onClick={() => (menu ? closeMenu() : openMenu())}
      className="p-2 rounded-full bg-[#1a1a1a] dark:bg-[#f3f3f3] text-[#f3f3f3] dark:text-[#1a1a1a] mx-6"
    >
      <span className="relative w-6 h-6 block">
        <span
          ref={topLine}
          className="absolute left-1/2 top-1/2 w-5 h-0.5 bg-[#f3f3f3] dark:bg-[#1a1a1a] transform -translate-x-1/2 -translate-y-1.5 rounded-full"
        />
        <span
          ref={bottomLine}
          className="absolute left-1/2 top-1/2 w-5 h-0.5 bg-[#f3f3f3] dark:bg-[#1a1a1a] transform -translate-x-1/2 translate-y-1.5 rounded-full"
        />
      </span>
    </button>
  </div>

  {/* Mobile Menu */}
  {menu && (
    <ul className="fixed flex flex-col top-16 left-1/2 -translate-x-1/2 w-11/12 max-w-sm h-auto space-y-4 justify-center items-start bg-[#1a1a1a] dark:bg-[#f3f3f3] rounded-4xl p-6 z-50 shadow-lg md:hidden" ref={mobileMenuRef}>
      {navItems.map((item) => (
        <li key={item.name} className="w-full">
          <Link
            href={item.href}
            className="mobile-link flex justify-between items-center w-full text-[#f3f3f3] dark:text-[#1a1a1a] text-xl lexend-400 hover:bg-[#333333] dark:hover:bg-[#e5e5e5] rounded-3xl px-3 py-2 transition-all"
            onClick={() => closeMenu()}
          >
            {item.name}
            <span className="text-sm dark:text-[#1a1a1a] rounded-2xl p-3">
              {item.logo}
            </span>
          </Link>
        </li>
      ))}

      <li className="w-full pt-4">
        {isSignedIn ? (
          <div className="flex items-center justify-around space-x-4 rounded-3xl p-2">
            <div className="flex items-center dark:bg-[#1a1a1a] bg-[#f3f3f3] rounded-full px-4 py-2">
              <UserButton showName={true} />
            </div>
            <Link
              href="/dashboard"
              className="mobile-link dark:text-[#1a1a1a] flex justify-center items-center text-[#f3f3f3] bg-[#1a1a1a] dark:bg-[#f3f3f3] hover:bg-[#333333] dark:hover:bg-[#e5e5e5] rounded-4xl font-medium lexend-400 px-6 py-3"
              onClick={() => closeMenu()}
            >
              <LayoutDashboard className="inline w-5 h-5 mr-2" />
              Dashboard
            </Link>
          </div>
        ) : (
          <div className="flex justify-center items-center gap-4">
            <SignInButton mode="modal">
              <button className="mobile-link bg-[#1a1a1a] dark:bg-[#f3f3f3] text-[#f3f3f3] dark:text-[#1a1a1a] px-9 my-4 py-2 rounded-3xl font-medium lexend-400 hover:bg-[#333333] dark:hover:bg-[#e5e5e5] transition-all" onClick={() => closeMenu()}>
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="mobile-link bg-[#1a1a1a] dark:bg-[#f3f3f3] text-[#f3f3f3] dark:text-[#1a1a1a] px-9 my-4 py-2 rounded-3xl font-medium lexend-400 hover:bg-[#333333] dark:hover:bg-[#e5e5e5] transition-all" onClick={() => closeMenu()}>
                Sign Up
              </button>
            </SignUpButton>
          </div>
        )}
      </li>
    </ul>
  )}

  {/* Dark Mode Toggle */}
  <div className="flex items-center">
    <button className="rounded-full p-2 bg-[#1a1a1a] dark:bg-[#f3f3f3] mx-9" onClick={handleDarkModeToggle} ref={modeIcon}>
      {darkMode ? (
        <Sun className="text-[#f3f3f3] dark:text-[#1a1a1a] h-6 w-6" />
      ) : (
        <Moon className="text-[#f3f3f3] dark:text-[#1a1a1a] h-6 w-6" />
      )}
    </button>
  </div>

</nav>

  );
};

export default Navbar;
