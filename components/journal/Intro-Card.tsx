'use client';
import { useUser } from "@clerk/nextjs";
import React from "react";

export default function WelcomeCard() {
  const { user, isSignedIn } = useUser();

  if (!isSignedIn) return null;

  const firstLetter = user.firstName?.charAt(0).toUpperCase() ?? "U";
  const fullName = `${user.firstName ?? "User"}${user.lastName ? " " + user.lastName : ""}`;

  return (
    <div className="relative lexend-400  w-full max-w-xl p-6 m-4 rounded-xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-black shadow-[0_0_20px_#0f0f0f] overflow-hidden group">

      {/* ✨ Glow border */}
      <div className="absolute inset-0 rounded-xl pointer-events-none border border-transparent group-hover:border-purple-500/20 transition duration-300 shadow-[0_0_30px_#7c3aed33]" />

      {/* 🌌 Floating soft particles */}
      <div className="absolute -top-10 -left-10 h-40 w-40 bg-zinc-950/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 h-24 w-24 bg-slate-400/10 rounded-full blur-2xl animate-spin-slow" />
      <div className="absolute top-1/2 left-2/3 h-12 w-12 bg-gray-400/20 rounded-full blur-md animate-bounce-slow" />

      {/* 🧵 Wool texture */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,#2a2a2a_0_2px,transparent_2px_6px)] opacity-[0.04] pointer-events-none z-0" />

      {/* 🧩 Geometric shapes */}
      <div className="absolute -top-6 -right-6 h-18 w-18 rotate-12 bg-gradient-to-br text-center from-slate-600/30 to-zinc-500/20 border border-slate-600/20 rounded-lg shadow-inner shadow-purple-700/10 backdrop-blur-md flex items-center justify-center">
        <span className="text-2xl font-bold text-white opacity-70 josefinSlab-700">
          {firstLetter}
        </span>
      </div>

      <div className="absolute -bottom-6 left-0 h-10 w-10 rotate-[30deg] bg-gradient-to-tr from-zinc-600/20 to-zinc-400/10 rounded-sm shadow-inner shadow-zinc-700/20 blur-[0.5px]" />
      <div className="absolute -top-5 left-8 h-5 w-5 bg-slate-600/20 rounded-full blur-[1px]" />
      <div className="absolute bottom-0 right-1/2 h-4 w-4 rotate-45 bg-zinc-500/10 border border-zinc-500/20 shadow-sm shadow-fuchsia-400/10" />

      {/* 🧠 Main content */}
      <div className="relative z-10 space-y-2">
        <p className="text-sm text-zinc-400 font-light">It's an honour to meet you!</p>
        <h2 className="text-3xl font-extrabold text-zinc-100 josefinSlab-700">
          {fullName}
        </h2>
        <p className="text-sm text-zinc-500 tracking-wide">
          In this space, you are the only Chosen one!<br /> Let your novel be the sky. <br />
          {user.firstName ?? "Dreamer"}, let's begin!
        </p>
        <p className="text-xs text-zinc-600 uppercase tracking-widest mt-1">
          Initial: {firstLetter}
        </p>
      </div>
    </div>
  );
}
