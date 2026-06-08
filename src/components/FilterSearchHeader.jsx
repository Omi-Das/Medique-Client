"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Input, Button } from "@heroui/react";

export default function FilterSearchHeader() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [startDate, setStartDate] = useState(searchParams.get("startDate") || "");
  const [endDate, setEndDate] = useState(searchParams.get("endDate") || "");

  const handleSearchAndFilter = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (search.trim()) params.set("search", search.trim());
    if (startDate) params.set("startDate", startDate);
    if (endDate) params.set("endDate", endDate);

    router.push(`/tutors?${params.toString()}`);
  };

  const handleReset = () => {
    setSearch("");
    setStartDate("");
    setEndDate("");
    router.push("/tutors");
  };

  return (
    <form onSubmit={handleSearchAndFilter} className="bg-gray p-6 rounded-xl border border-gray-100 shadow-xs mb-8 flex flex-col md:flex-row items-end gap-4 w-full">
      
      <div className="w-full md:flex-grow">
        <label className="text-xs font-bold text-gray-700 block mb-1">Search Tutor Name</label>
        <Input 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          placeholder="Type tutor name..." 
          className="w-full"
        />
      </div>

      <div className="w-full md:w-48">
        <label className="text-xs font-bold text-gray-700 block mb-1">Start Date</label>
        <Input 
          type="date" 
          value={startDate} 
          onChange={(e) => setStartDate(e.target.value)} 
          className="w-full"
        />
      </div>

      <div className="w-full md:w-48">
        <label className="text-xs font-bold text-gray-700 block mb-1">End Date</label>
        <Input 
          type="date" 
          value={endDate} 
          onChange={(e) => setEndDate(e.target.value)} 
          className="w-full"
        />
      </div>

      <div className="flex gap-2 w-full md:w-auto flex-shrink-0">
        <Button type="submit" className="bg-cyan-500 text-white font-bold rounded-lg px-6 h-10 hover:bg-cyan-600 flex-grow md:flex-grow-0">
          Apply
        </Button>
        <Button type="button" onClick={handleReset} variant="flat" className="font-bold rounded-lg bg-gray px-4 h-10 flex-grow md:flex-grow-0">
          Reset
        </Button>
      </div>

    </form>
  );
}
