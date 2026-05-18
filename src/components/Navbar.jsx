"use client";

import { authClient } from "@/lib/auth-client";
import { Avatar, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const pathname = usePathname(); // Get the current active route path

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  // Helper function to apply active link styles dynamically
  const getLinkStyle = (path) => {
    const isActive = pathname === path;
   return `px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
      isActive
        ? "bg-cyan-500 text-white shadow-sm" // Active route style
        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900" // Normal/Hover style
    }`;
  };

  return (
    <div className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 shadow-sm h-16 flex items-center">
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-6">
        
        {/* 1. Left Section: Navigation Links */}
        <ul className="flex items-center gap-2">
          <li>
            <Link href="/" className={getLinkStyle("/")}>Home</Link>
          </li>
          <li>
            <Link href="/tutors" className={getLinkStyle("/tutors")}>Tutors</Link>
          </li>

          {/* Protected Links rendering dynamically based on routing state */}
          {user && (
            <>
              <li>
                <Link href="/add-tutor" className={getLinkStyle("/add-tutor")}>Add Tutor</Link>
              </li>
              <li>
                <Link href="/my-tutors" className={getLinkStyle("/my-tutors")}>My Tutors</Link>
              </li>
              <li>
                <Link href="/booked-sessions" className={getLinkStyle("/booked-sessions")}>My Booked Sessions</Link>
              </li>
            </>
          )}
        </ul>

        {/* 2. Middle Section: Website Branding / Logo */}
        <div className="flex items-center justify-center flex-shrink-0 mx-4">
          <Link href="/" className="flex items-center gap-2 group">
    {/* Minimalist Modern Logo Icon */}
    <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-black text-lg shadow-md shadow-cyan-100 group-hover:scale-105 transition-transform">
      W
    </div>
    {/* Dynamic Text Gradient Logo */}
    <span className="text-2xl font-black tracking-wider bg-gradient-to-r from-cyan-500 via-teal-400 to-blue-600 bg-clip-text text-transparent group-hover:opacity-90 transition-opacity">
      Wanderlust
    </span>
  </Link>
        </div>

        {/* 3. Right Section: User Action Elements */}
     <ul className="flex items-center gap-4 flex-shrink-0 h-10 justify-end min-w-[80px]">
          {user ? (
            <li>
              <Dropdown placement="bottom-end" className="rounded-xl border border-gray-100">
                <DropdownTrigger>
                  <Avatar
                    as="button"
                    className="transition-transform ring-2 ring-cyan-500 ring-offset-2 w-9 h-9 text-sm font-bold bg-cyan-100 text-cyan-800"
                    src={user?.image || undefined}
                    name={user?.name?.charAt(0) || "U"}
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem key="profile" textValue="Profile" className="rounded-lg">
                    <Link href="/profile" className="block w-full font-medium text-gray-700">
                      My Profile
                    </Link>
                  </DropdownItem>
                  <DropdownItem key="logout" color="danger" onClick={handleSignOut} textValue="Log Out" className="rounded-lg font-medium">
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </li>
          ) : (
            <>
              <li>
                <Link href="/login" className="text-gray-600 hover:text-cyan-500 font-semibold text-sm transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/signup">
                  <Button size="sm" className="font-bold rounded-lg bg-cyan-500 text-white shadow-md shadow-cyan-100 hover:bg-cyan-600 hover:shadow-lg transition-all duration-200 px-5 py-4">
                    Sign Up
                  </Button>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
