"use client";

import { useState, useEffect } from "react";
import Link from "next/link"; // Fixed: Standard Next.js link import path
import Image from "next/image";
import LoadingSpinner from "./LoadingSpinner";

export default function AvailableTutors() {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/v1/available-tutors");
        const data = await res.json();
        setTutors(Array.isArray(data) ? data : []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tutors:", error);
        setLoading(false);
      }
    };
    fetchTutors();
  }, []);

  // 
  if (loading) {
  return <LoadingSpinner label="Loading top available tutors..." />;
}


  if (tutors.length === 0) {
    return <p className="text-center text-gray-500">No tutors found in the database.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {tutors.map((tutor) => (
        <div key={tutor._id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:scale-[1.01] transition-transform flex flex-col justify-between">
          
          {/* ইমেজ কন্টেইনার এবং নেক্সট ইমেজ হ্যান্ডলার */}
          <div className="h-52 w-full relative bg-gray-100 block">
            <Image
              alt={tutor.name || "Tutor Photo"}
              className="object-cover"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              src={tutor.photo && tutor.photo.trim() !== "" && tutor.photo.startsWith("http") ? tutor.photo.trim() : "https://unsplash.com"}
              referrerPolicy="no-referrer"
              priority={true}
            />
          </div>

          {/* টিউটর কন্টেন্ট ও ইনফরমেশন */}
          <div className="p-5 space-y-2 flex-grow flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-lg text-gray-800">{tutor.name}</h3>
                <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded font-bold">
                  ${tutor.hourlyFee}/hr
                </span>
              </div>
              <p className="text-sm text-gray-600">Subject: <span className="font-semibold text-gray-800">{tutor.subject}</span></p>
              <p className="text-sm text-gray-600">Experience: <span className="font-semibold text-gray-800">{tutor.experience}</span></p>
              <p className="text-sm text-gray-600">Institution: <span className="font-semibold text-gray-800">{tutor.institution}</span></p>
            </div>
            
            <div className="pt-4">
              <Link href={`/tutors/${tutor._id}`}>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg text-sm transition-colors">
                  Book Session
                </button>
              </Link>
            </div>
          </div>

        </div>
      ))}
    </div>
  );
}
