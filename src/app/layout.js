import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Tutor Booking Platform",
  description: "Find and book the best tutors online",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
     {/* main e navbar hoi na body te hoi */}
      <body className="flex flex-col min-h-screen bg-gray-55 text-gray-900">
        
       {/* Global share page */}
        <Navbar />

     {/* Dynamic main content */}
        <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-6">
          {children}
        </main>

     {/* Footer */}
        <Footer />

      </body>
    </html>
  );
}
