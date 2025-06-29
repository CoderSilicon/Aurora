import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import GridImage from "@/assets/error/grid-01.svg";
import Error404Image from "@/assets/error/404.svg";
import { Home } from "lucide-react";

export const metadata: Metadata = {
  title: "Oops! Error Occured :(",
  description: "We can’t seem to find the page you are looking for!",
};

export default function Error404() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-6 overflow-hidden z-1">
      <div className="absolute right-0 top-0 -z-1 w-full max-w-[250px] xl:max-w-[450px]">
        <Image
          width={540}
          height={254}
          src={GridImage}
          alt="grid"
          className="invert dark:invert-0"
        />
      </div>
      <div className="absolute bottom-0 left-0 -z-1 w-full max-w-[250px] rotate-180 xl:max-w-[450px]">
        <Image
          width={540}
          height={254}
          src={GridImage}
          alt="grid"
          className="invert dark:invert-0"
        />
      </div>
      <div className="mx-auto w-full max-w-[242px] text-center sm:max-w-[472px]">
        <h1 className="mb-8 font-bold text-gray-800 text-md dark:text-white/90 xl:text-7xl lexend-600">
          Error
        </h1>

        <Image
          src={Error404Image}
          alt="404"
          className="dark:invert"
          width={472}
          height={152}
        />

        <p className="mt-10 mb-6 text-base text-gray-700 dark:text-gray-400 sm:text-lg lexend-400">
          We can’t seem to find the page you are looking for!
          <br />
          Maybe it’s hiding, or maybe it never existed.
          <br />
        </p>

        <Link href="/" className="flex justify-center items-center gap-2">
          <button
            type="button"
            className="lexend-400 px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            <span className="flex items-center gap-2">
              <Home />Home :)
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
}
