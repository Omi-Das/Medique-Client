"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  const getLinkStyle = (path) => {
    const isActive = pathname === path;
    return `px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 block md:inline-block ${
      isActive
        ? "bg-cyan-500 text-white shadow-sm" 
        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white" 
    }`;
  };

  return (
    <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50 shadow-sm min-h-16 flex flex-col justify-center w-full transition-colors">
      <nav className="container mx-auto px-4 md:px-6 flex items-center justify-between h-16 w-full relative gap-2">
        
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
              )}
            </button>
          </div>

          <Link href="/" className="flex items-center gap-2 group select-none">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-black text-md shadow-md group-hover:scale-105 transition-transform flex-shrink-0">
              M
            </div>
            <span className="text-xl font-black tracking-wider bg-gradient-to-r from-cyan-500 via-teal-400 to-blue-600 bg-clip-text text-transparent group-hover:opacity-90 transition-opacity whitespace-nowrap">
              Medique
            </span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-1 flex-grow justify-start pl-4">
          <ul className="flex items-center gap-1">
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
        </div>

        <div className="flex items-center justify-end gap-2 md:gap-3 flex-shrink-0">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:opacity-90 transition-all text-sm md:text-base flex items-center justify-center h-9 w-9"
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
              <button onClick={() => router.push("/profile")} className="hidden sm:inline-block px-2.5 py-1.5 rounded-lg text-xs md:text-sm font-semibold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-cyan-500 dark:hover:bg-cyan-500 hover:text-white transition-all duration-200 shadow-sm">
                Profile
              </button>
              <button onClick={handleSignOut} className="px-2.5 py-1.5 rounded-lg text-xs md:text-sm font-semibold bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 hover:bg-red-500 dark:hover:bg-red-500 hover:text-white transition-all duration-200 shadow-sm">
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login" className="text-gray-600 dark:text-gray-300 hover:text-cyan-500 font-semibold text-xs md:text-sm transition-colors whitespace-nowrap">Login</Link>
              <Link href="/signup"><Button size="sm" className="font-bold rounded-lg bg-cyan-500 text-white shadow-sm hover:bg-cyan-600 px-3 md:px-5 h-8 md:h-9 text-xs md:text-sm">Sign Up</Button></Link>
            </div>
          )}
        </div>
      </nav>

      {isOpen && (
        <div className="md:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 w-full px-4 py-3 transition-all duration-300">
          <ul className="flex flex-col gap-2">
            <li><Link href="/" className={getLinkStyle("/")}>Home</Link></li>
            <li><Link href="/tutors" className={getLinkStyle("/tutors")}>Tutors</Link></li>
            {user && (
              <>
                <li><Link href="/add-tutor" className={getLinkStyle("/add-tutor")}>Add Tutor</Link></li>
                <li><Link href="/my-tutors" className={getLinkStyle("/my-tutors")}>My Tutors</Link></li>
                <li><Link href="/booked-sessions" className={getLinkStyle("/booked-sessions")}>My Booked Sessions</Link></li>
                <li><button onClick={() => router.push("/profile")} className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">My Profile</button></li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
