"use client";

import Link from "next/link";
import { Button } from "@heroui/react";

export default function NotFound() {
  return (
    <div className="container mx-auto max-w-7xl flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      
      <div className="relative mb-6">
        <h1 className="text-9xl font-black tracking-widest text-cyan-500/20 select-none animate-pulse">
          404
        </h1>
        <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-black text-gray-800 whitespace-nowrap">
          Oops! Page Not Found
        </p>
      </div>

      <p className="text-gray-500 text-sm max-w-md mb-8 leading-relaxed">
        The route you are looking for might have been removed, had its name changed, 
        or is temporarily unavailable. Let's get you back on track.
      </p>

      <Link href="/">
        <Button 
          className="font-bold rounded-lg bg-cyan-500 text-white shadow-md shadow-cyan-100 hover:bg-cyan-600 px-6 h-11 transition-all"
        >
          Back to Home Page
        </Button>
      </Link>
    </div>
  );
}
