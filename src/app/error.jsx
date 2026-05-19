"use client";

import { useEffect } from "react";
import { Button } from "@heroui/react";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Standard system telemetry tracking logging hook
    console.error("Application runtime exception intercepted:", error);
  }, [error]);

  return (
    <div className="container mx-auto max-w-7xl flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      
      <div className="w-16 h-16 bg-red-50 text-red-500 border border-red-100 rounded-full flex items-center justify-center text-3xl mb-4 shadow-sm animate-bounce">
        ⚠️
      </div>

      <h1 className="text-3xl font-black text-gray-800 tracking-tight">
        Something Went Wrong!
      </h1>
      
      <p className="text-gray-500 text-sm max-w-md mt-2 mb-8 leading-relaxed">
        An unexpected structural parsing error occurred while loading this view section. 
        You can try resetting the local interface module state.
      </p>

      <div className="flex flex-wrap gap-3 justify-center">
        {/* 🎯 "reset" function tells Next.js to try re-rendering the route server side instantly */}
        <Button 
          onClick={() => reset()}
          className="font-bold rounded-lg bg-cyan-500 text-white shadow-md shadow-cyan-100 hover:bg-cyan-600 px-6 h-11 transition-all"
        >
          Try Re-rendering Again
        </Button>

        <Button 
          onClick={() => window.location.href = "/"}
          variant="flat"
          className="font-bold rounded-lg text-gray-700 px-6 h-11 border"
        >
          Go to Home Screen
        </Button>
      </div>
    </div>
  );
}
