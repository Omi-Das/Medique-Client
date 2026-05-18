"use client";

import { authClient } from "@/lib/auth-client";
import { Avatar, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
//   const { data: session } = authClient.useSession();
//   const user = session?.user;

//   const handleSignOut = async () => {
//     await authClient.signOut();
//   };

  return (
    <div className="bg-white py-3 shadow-sm sticky top-0 z-50">
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-4">
        
        <ul className="flex items-center gap-6 font-medium text-gray-700">
          <li>
            <Link href={"/"} className="hover:text-blue-600 transition">Home</Link>
          </li>
          <li>
            <Link href={"/tutors"} className="hover:text-blue-600 transition">Tutors</Link>
          </li>

          {user && (
            <>
              <li>
                <Link href={"/add-tutor"} className="hover:text-blue-600 transition">Add Tutor</Link>
              </li>
              <li>
                <Link href={"/my-tutors"} className="hover:text-blue-600 transition">My Tutors</Link>
              </li>
              <li>
                <Link href={"/booked-sessions"} className="hover:text-blue-600 transition">My Booked Sessions</Link>
              </li>
            </>
          )}
        </ul>

        <div>
          <Link href={"/"}>
            <Image
              src={"/assets/Wanderlast.png"}
              height={150}
              width={150}
              alt="logo"
              priority
            />
          </Link>
        </div>
        <ul className="flex items-center gap-4">
          {user ? (
            <li>
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
              <li>
                <Link href={"/login"} className="text-gray-700 hover:text-blue-600 font-medium transition">
                  Login
                </Link>
              </li>
              <li>
                <Link href={"/signup"}>
                  <Button size="sm" color="primary" className="font-medium">
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
