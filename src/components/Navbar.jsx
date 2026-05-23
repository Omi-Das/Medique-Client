"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes"; // 🎯 Imported useTheme Hook
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const pathname = usePathname();
  const router = useRouter();
  
  // Theme toggling internal state trackers
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid Next.js server-side hydration mismatches by tracking initial client mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  const getLinkStyle = (path) => {
    const isActive = pathname === path;
    return `px-3 py-1.5 rounded-lg text-xs md:text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
      isActive
        ? "bg-cyan-500 text-white shadow-sm shadow-cyan-100 dark:shadow-none" 
        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white" 
    }`;
  };

  return (
    <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50 shadow-sm h-16 flex items-center w-full transition-colors">
      <nav className="container mx-auto px-4 md:px-6 flex items-center justify-between gap-2 md:gap-4 w-full">
        
        {/* 1. Left Section: Navigation Links */}
        <ul className="flex items-center gap-1 flex-shrink-0 min-w-0 overflow-x-auto scrollbar-none py-1">
          <li><Link href="/" className={getLinkStyle("/")}>Home</Link></li>
          <li><Link href="/tutors" className={getLinkStyle("/tutors")}>Tutors</Link></li>
          {user && (
            <>
              <li><Link href="/add-tutor" className={getLinkStyle("/add-tutor")}>Add Tutor</Link></li>
              <li><Link href="/my-tutors" className={getLinkStyle("/my-tutors")}>My Tutors</Link></li>
              <li><Link href="/booked-sessions" className={getLinkStyle("/booked-sessions")}>My Booked Sessions</Link></li>
            </>
          )}
        </ul>

        {/* 2. Middle Section: Website Gradient Logo */}
        <div className="flex items-center justify-center flex-shrink-0 mx-1 md:mx-2">
          <Link href="/" className="flex items-center gap-1 md:gap-2 group">
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-black text-sm md:text-md shadow-md shadow-cyan-100 dark:shadow-none group-hover:scale-105 transition-transform flex-shrink-0">
              M
            </div>
            <span className="text-lg md:text-2xl font-black tracking-wider bg-gradient-to-r from-cyan-500 via-teal-400 to-blue-600 bg-clip-text text-transparent group-hover:opacity-90 transition-opacity whitespace-nowrap">
              Medique
            </span>
          </Link>
        </div>

        {/* 3. Right Section: Themes Toggle & Profile Actions Row */}
        <div className="flex items-center justify-end flex-shrink-0 gap-2 md:gap-3">
          
          {/* 🎯 Theme Toggling Action Button implementation */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:opacity-90 transition-all text-sm md:text-base"
              aria-label="Toggle Dark Mode"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
          )}

          {user ? (
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-8 h-8 md:w-9 md:h-9 rounded-full ring-2 ring-cyan-500 ring-offset-2 overflow-hidden flex-shrink-0 flex items-center justify-center bg-cyan-100 font-bold text-cyan-800 text-xs md:text-sm shadow-sm">
                {user?.image ? (
                  <img src={user.image} alt="User" className="w-full h-full object-cover" />
                ) : (
                  <span>{user?.name?.charAt(0) || "U"}</span>
                )}
              </div>
              <button onClick={() => router.push("/profile")} className="px-2.5 py-1.5 rounded-lg text-xs md:text-sm font-semibold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-cyan-500 dark:hover:bg-cyan-500 hover:text-white transition-all duration-200 shadow-sm">
                My Profile
              </button>
              <button onClick={handleSignOut} className="px-2.5 py-1.5 rounded-lg text-xs md:text-sm font-semibold bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 hover:bg-red-500 dark:hover:bg-red-500 hover:text-white transition-all duration-200 shadow-sm">
                Logout
              </button>
            </div>
          ) : (
            <ul className="flex items-center gap-2 md:gap-4">
              <li><Link href="/login" className="text-gray-600 dark:text-gray-300 hover:text-cyan-500 font-semibold text-xs md:text-sm transition-colors whitespace-nowrap">Login</Link></li>
              <li><Link href="/signup" className="block"><Button size="sm" className="font-bold rounded-lg bg-cyan-500 text-white shadow-md shadow-cyan-100 dark:shadow-none hover:bg-cyan-600 px-3 md:px-5 h-8 md:h-9 text-xs md:text-sm">Sign Up</Button></Link></li>
            </ul>
          )}
        </div>

      </nav>
    </div>
  );
};

export default Navbar;

// "use client";

// import { authClient } from "@/lib/auth-client";
// import { Button } from "@heroui/react";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import React from "react";

// const Navbar = () => {
//   // BetterAuth থেকে ইউজারের সেশন ডাটা নিয়ে আসা হচ্ছে
//   const { data: session } = authClient.useSession();
//   const user = session?.user;
  
//   // বর্তমান পেজের পাথ বা রুট ট্র্যাক করার জন্য usePathname
//   const pathname = usePathname();
//   const router = useRouter();

//   // লগআউট ফাংশন হ্যান্ডলার
//   const handleSignOut = async () => {
//     await authClient.signOut();
//   };

//   // একটিভ পেজ অনুযায়ী লিংকগুলোর সিএসএস স্টাইল ডাইনামিক করার ফাংশন
//   const getLinkStyle = (path) => {
//     const isActive = pathname === path;
//     return `px-3 py-1.5 rounded-lg text-xs md:text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
//       isActive
//         ? "bg-cyan-500 text-white shadow-sm shadow-cyan-100" // একটিভ পেজের স্টাইল
//         : "text-gray-600 hover:bg-gray-100 hover:text-gray-900" // নরমাল পেজের স্টাইল
//     }`;
//   };

//   return (
//     // মেইন নেভবার কন্টেইনার (ফিক্সড হাইট h-16 দিয়ে লেআউট শিফট আটকানো হয়েছে)
//     <div className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 shadow-sm h-16 flex items-center w-full">
//       {/* দুই পাশে সমান মার্জিন রাখার জন্য container mx-auto ব্যবহার করা হয়েছে */}
//       <nav className="container mx-auto px-4 md:px-6 flex items-center justify-between gap-2 md:gap-4 w-full">
        
//         {/* ১. বামপাশের সেকশন: নেভিগেশন লিংকসমূহ (মোবাইলে স্ক্রোলের সুবিধা সহ) */}
//         <ul className="flex items-center gap-1 flex-shrink-0 min-w-0 overflow-x-auto scrollbar-none py-1">
//           <li>
//             <Link href="/" className={getLinkStyle("/")}>Home</Link>
//           </li>
//           <li>
//             <Link href="/tutors" className={getLinkStyle("/tutors")}>Tutors</Link>
//           </li>

//           {/* ইউজার লগইন থাকলে এই লিংকগুলো ডাইনামিকালি পাশাপাশি দেখাবে */}
//           {user && (
//             <>
//               <li>
//                 <Link href="/add-tutor" className={getLinkStyle("/add-tutor")}>Add Tutor</Link>
//               </li>
//               <li>
//                 <Link href="/my-tutors" className={getLinkStyle("/my-tutors")}>My Tutors</Link>
//               </li>
//               <li>
//                 <Link href="/booked-sessions" className={getLinkStyle("/booked-sessions")}>My Booked Sessions</Link>
//               </li>
//             </>
//           )}
//         </ul>

//         <div className="flex items-center justify-center flex-shrink-0 mx-1 md:mx-2">
//           <Link href="/" className="flex items-center gap-1 md:gap-2 group">
//             <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-black text-sm md:text-md shadow-md shadow-cyan-100 group-hover:scale-105 transition-transform flex-shrink-0">
//               W
//             </div>
//             <span className="text-lg md:text-2xl font-black tracking-wider bg-gradient-to-r from-cyan-500 via-teal-400 to-blue-600 bg-clip-text text-transparent group-hover:opacity-90 transition-opacity whitespace-nowrap">
//               Wanderlust
//             </span>
//           </Link>
//         </div>

//         <div className="flex items-center justify-end flex-shrink-0">
//           {user ? (
//             <div className="flex items-center gap-2 md:gap-3">
              
//               <div className="w-8 h-8 md:w-9 md:h-9 rounded-full ring-2 ring-cyan-500 ring-offset-2 overflow-hidden flex-shrink-0 flex items-center justify-center bg-cyan-100 font-bold text-cyan-800 text-xs md:text-sm shadow-sm">
//                 {user?.image ? (
//                   <img src={user.image} alt="User" className="w-full h-full object-cover" />
//                 ) : (
//                   <span>{user?.name?.charAt(0) || "U"}</span>
//                 )}
//               </div>

//               <button 
//                 onClick={() => router.push("/profile")}
//                 className="px-2.5 py-1.5 rounded-lg text-xs md:text-sm font-semibold bg-gray-100 text-gray-700 hover:bg-cyan-500 hover:text-white transition-all duration-200 whitespace-nowrap shadow-sm"
//               >
//                 My Profile
//               </button>

//               <button 
//                 onClick={handleSignOut}
//                 className="px-2.5 py-1.5 rounded-lg text-xs md:text-sm font-semibold bg-red-50 text-red-600 hover:bg-red-500 hover:text-white transition-all duration-200 whitespace-nowrap shadow-sm"
//               >
//                 Logout
//               </button>

//             </div>
//           ) : (
//             // ইউজার লগইন না থাকলে এই লগইন এবং সাইনআপ বাটন দুটি দেখাবে
//             <ul className="flex items-center gap-2 md:gap-4">
//               <li>
//                 <Link href="/login" className="text-gray-600 hover:text-cyan-500 font-semibold text-xs md:text-sm transition-colors whitespace-nowrap">
//                   Login
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/signup" className="block">
//                   <Button size="sm" className="font-bold rounded-lg bg-cyan-500 text-white shadow-md shadow-cyan-100 hover:bg-cyan-600 hover:shadow-lg transition-all duration-200 px-3 md:px-5 h-8 md:h-9 text-xs md:text-sm">
//                     Sign Up
//                   </Button>
//                 </Link>
//               </li>
//             </ul>
//           )}
//         </div>

//       </nav>
//     </div>
//   );
// };

// export default Navbar;
