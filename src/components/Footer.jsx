"use client";

import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Learning Services</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/tutors" className="hover:text-blue-400 transition">Find a Tutor</Link>
            </li>
            <li>
              <Link href="/add-tutor" className="hover:text-blue-400 transition">Become a Tutor</Link>
            </li>
            <li>
              <Link href="/booked-sessions" className="hover:text-blue-400 transition">Online Sessions</Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-blue-400 transition">Help & FAQs</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Contact Information</h3>
          <ul className="space-y-2 text-sm">
            <li>📍 123 Education Ave, Suite 500</li>
            <li>📞 Phone: +1 (555) 019-2834</li>
            <li>✉️ Email: support@tutorplatform.com</li>
            <li>🕒 Hours: Mon - Fri / 9:00 AM - 6:00 PM</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Follow Us</h3>
          <p className="text-sm mb-4">Stay connected with our learning community through social media.</p>
          <div className="flex gap-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition">
              Facebook
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
              Twitter
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition">
              LinkedIn
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition">
              Instagram
            </a>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 mt-12 pt-6 border-t border-gray-800 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} TutorPlatform. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
