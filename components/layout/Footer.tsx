import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Linkedin, Send } from "lucide-react";
import Image from "next/image";
import Aurora from "@/assets/Aurora.svg";

export default function Footer() {
  const container = useRef(null);

  useEffect(() => {
    const elements = container.current.querySelectorAll(".stagger-item");
    gsap.from(elements, {
      opacity: 0,
      y: 10,
      stagger: 0.1,
      duration: 0.6,
      ease: "power2.out",
    });
  }, []);

  return (
    <footer
      ref={container}
      className="relative border-2 border-zinc-400 bg-white text-black font-[Poppins] overflow-hidden p-21 rounded-t-4xl dark:dark:bg-[#0b0e13] dark:text-white"
    >
      {/* Grid Content */}

      {/* Large Faint Aurora Background */}
      <div className="absolute inset-0 flex items-end justify-start pointer-events-none select-none">
        <h1 className="text-[18vw] md:text-[10vw] font-bold text-gray-950 text-center leading-none tracking-tight poppins-600 pl-4 md:pl-16 dark:text-gray-100">
          Aurora
        </h1>
        <Image
          src={Aurora}
          alt="Aurora "
            width={24}
            height={24}
          
          objectFit="cover"
          className="pointer-events-none select-none dark:invert"
        />
      </div>

      {/* Bottom Row */}
<div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row justify-start items-start md:items-center px-6 md:px-12 my-9 pb-8 gap-2 md:gap-8 text-xs">
  <div className="stagger-item text-left text-gray-600 text-sm md:text-base dark:text-gray-300">
    &copy; 2025 Silicon Inc. All rights reserved.
  </div>
  <div className="stagger-item text-left text-gray-500 text-xs md:text-sm dark:text-gray-400">
    Site by CoderSilicon
  </div>
  <nav aria-label="Social links">
          <div className="flex items-center space-x-3 stagger-item pt-2 md:pt-0">
            <Linkedin className="w-5 h-5 cursor-pointer hover:opacity-75 text-gray-500 hover:text-black transition dark:text-gray-400 dark:hover:text-white" />
            <Send className="w-5 h-5 cursor-pointer hover:opacity-75 text-gray-500 hover:text-black transition dark:text-gray-400 dark:hover:text-white" />
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <svg
            className="w-5 h-5 cursor-pointer hover:opacity-75 text-gray-500 hover:text-black transition dark:text-gray-400 dark:hover:text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
              >
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.304-5.466-1.332-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 0 1 3.003-.404c1.018.005 2.045.138 3.003.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.625-5.475 5.921.43.372.823 1.102.823 2.222v3.293c0 .322.218.694.825.576C20.565 21.796 24 17.297 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
            <a
              href="https://patreon.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Patreon"
            >
              <svg
            className="w-5 h-5 cursor-pointer hover:opacity-75 text-gray-500 hover:text-black transition dark:text-gray-400 dark:hover:text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
              >
            <circle cx="17.5" cy="6.5" r="4.5" />
            <rect x="2" y="2" width="4" height="20" rx="2" />
              </svg>
            </a>
          </div>
        </nav>
      </div>
    </footer>
  );
}
