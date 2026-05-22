import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import Providers from "@/components/Providers";
export const metadata = {
  title: {
    default: "medique | Find Expert Tutors",
    template: "%s | medique" 
  },
  description: "Find and book the best tutors online seamlessly.",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html
      lang="en" suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex flex-col min-h-screen bg-gray-55 text-gray-900">
         {/* Global Toast Notification Container
        <Toaster position="top-center" reverseOrder={false} />
        <Navbar />
        <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-6">
          {children}
        </main>
        <Footer /> */}
        {/* Global providers boundary wrapping the application content nodes */}
        <Providers>
          <Toaster position="top-center" reverseOrder={false} />
          <Navbar />
          <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-6">
            {children}
          </main>
          <Footer />
        </Providers>

      </body>
    </html>
  );
}
