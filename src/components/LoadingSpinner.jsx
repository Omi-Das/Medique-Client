"use client";

import { Spinner } from "@heroui/react";

export default function LoadingSpinner({ label = "Loading data parameters..." }) {
  return (
    <div className="w-full min-h-[40vh] flex flex-col items-center justify-center gap-3 py-12">
      {/* 🎯 HeroUI customized loader thread */}
      <Spinner 
        size="lg" 
        color="current" 
        className="text-cyan-500" 
      />
      <p className="text-sm font-semibold text-gray-500 animate-pulse tracking-wide">
        {label}
      </p>
    </div>
  );
}
