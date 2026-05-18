"use client";

import { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  // আপাতত টেস্ট করার জন্য ফলস স্টেট (এরর মুক্ত)
  const [user, setUser] = useState(null); 

  return (
    <div className="bg-white py-3 shadow-sm border-b">
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-4">
        
        {/* ১. নেভিগেশন লিংকসমূহ */}
        <ul className="flex gap-6 font-medium text-gray-700">
          <li><Link href={"/"}>Home</Link></li>
          <li><Link href={"/tutors"}>Tutors</Link></li>
          {user && (
            <>
              <li><Link href={"/add-tutor"}>Add Tutor</Link></li>
              <li><Link href={"/my-tutors"}>My Tutors</Link></li>
              <li><Link href={"/booked-sessions"}>My Booked Sessions</Link></li>
            </>
          )}
        </ul>

        {/* ২. ওয়েবসাইটের নাম */}
        <div>
          <Link href={"/"} className="text-xl font-bold text-blue-600">
            TutorPlatform
          </Link>
        </div>

        {/* ৩. প্রোফাইল/লগইন সেকশন */}
        <ul className="flex items-center gap-4">
          {user ? (
            <>
              <li className="text-sm font-medium text-gray-700">{user.name}</li>
              <li>
                <button 
                  onClick={() => setUser(null)}
                  className="bg-red-500 text-white text-xs px-3 py-1.5 rounded-md"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link href={"/login"} className="text-sm text-gray-600 hover:text-blue-600">Login</Link></li>
              <li>
                <button 
                  onClick={() => setUser({ name: "Demo User" })}
                  className="bg-blue-600 text-white text-sm px-4 py-1.5 rounded-md"
                >
                  Sign Up
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
