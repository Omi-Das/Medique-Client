"use client";

import { authClient } from "@/lib/auth-client";
import { Avatar, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  // Fetch authentication state dynamically from BetterAuth
  const { data: session } = authClient.useSession();
  const user = session?.user;

  // Sign out handler function
  const handleSignOut = async () => {
    await authClient.signOut();
  };

  return (
    <div className="bg-white py-3 shadow-sm border-b sticky top-0 z-50">
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-4">
        
        {/* 1. Left Section: Navigation Links */}
        <ul className="flex items-center gap-6 font-medium text-gray-700">
          <li>
            <Link href={"/"} className="hover:text-cyan-500 transition">Home</Link>
          </li>
          <li>
            <Link href={"/tutors"} className="hover:text-cyan-500 transition">Tutors</Link>
          </li>

          {/* Conditional links visible only after user logs in */}
          {user && (
            <>
              <li>
                <Link href={"/add-tutor"} className="hover:text-cyan-500 transition">Add Tutor</Link>
              </li>
              <li>
                <Link href={"/my-tutors"} className="hover:text-cyan-500 transition">My Tutors</Link>
              </li>
              <li>
                <Link href={"/booked-sessions"} className="hover:text-cyan-500 transition">My Booked Sessions</Link>
              </li>
            </>
          )}
        </ul>

        {/* 2. Middle Section: Website Logo / Name */}
        <div>
          <Link href={"/"}>
            <Image
              src={"/assets/Wanderlast.png"} // Update path if your asset name is different
              height={150}
              width={150}
              alt="logo"
              priority
            />
          </Link>
        </div>

        {/* 3. Right Section: User Profile Dropdown or Authentication Status */}
        <ul className="flex items-center gap-4">
          {user ? (
            <li>
              {/* Profile image dropdown displaying user options if logged in */}
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    src={user?.image || undefined}
                    name={user?.name?.charAt(0) || "U"}
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem key="profile" textValue="Profile">
                    <Link href={"/profile"} className="block w-full">
                      My Profile
                    </Link>
                  </DropdownItem>
                  <DropdownItem key="logout" color="danger" onClick={handleSignOut} textValue="Log Out">
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </li>
          ) : (
            <>
              {/* Default buttons visible if the user is not authenticated */}
              <li>
                <Link href={"/login"} className="text-gray-700 hover:text-cyan-500 font-medium transition">
                  Login
                </Link>
              </li>
              <li>
                <Link href={"/signup"}>
                  <Button size="sm" className="font-semibold rounded-none bg-cyan-500 text-white hover:bg-cyan-600">
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
