"use client";

import { useState, useEffect } from "react";
import { Button } from "@heroui/react";
import Link from "next/link";

export default function Banner() {
  // ফ্রন্টএন্ডেই ৩টি স্লাইডের ডাটা এবং ইমেজ লিংক রাখা হলো
  const slides = [
    {
      id: 1,
      title: "Find the Perfect Expert Tutor for Your Journey",
      desc: "Connect with top verified teachers worldwide and master any subject easily through live interactive sessions.",
      image: "https://unsplash.com",
      buttonText: "Explore All Tutors"
    },
    {
      id: 2,
      title: "Learn at Your Own Pace, Anywhere, Anytime",
      desc: "Get customized and flexible study schedules tailored exclusively to your personal academic needs and speed.",
      image: "https://unsplash.com",
      buttonText: "Find Your Tutor"
    },
    {
      id: 3,
      title: "Boost Your Professional Skills & Academic Goals",
      desc: "Join thousands of successful learners who have already unlocked their potential and reached their dreams.",
      image: "https://unsplash.com",
      buttonText: "Get Started Now"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // প্রতি ৫ সেকেন্ড পর পর অটোমেটিক স্লাইড পরিবর্তন হওয়ার লজিক
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative w-full h-[480px] overflow-hidden rounded-2xl shadow-xl">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 flex flex-col justify-center items-center text-center px-6 transition-all duration-1000 ease-in-out bg-cover bg-center ${
            index === currentSlide ? "opacity-100 scale-100 z-10" : "opacity-0 scale-95 z-0"
          }`}
          style={{ backgroundImage: `url('${slide.image}')` }}
        >
          {/* টেক্সটের ভিজিবিলিটি বাড়ানোর জন্য ব্ল্যাক ওভারলে */}
          <div className="absolute inset-0 bg-black/60 z-0 rounded-2xl" />

          {/* কন্টেন্ট সেকশন */}
          <div className="relative z-10 max-w-3xl space-y-4">
            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight drop-shadow-sm">
              {slide.title}
            </h1>
            <p className="text-gray-200 text-base md:text-xl max-w-xl mx-auto font-light leading-relaxed">
              {slide.desc}
            </p>
            
            {/* 🎯 কল-টু-অ্যাকশন বাটন (Tutors Page-এ নিয়ে যাবে) */}
            <div className="pt-4">
              <Link href="/tutors">
                <Button 
                  size="lg" 
                  color="primary" 
                  className="font-semibold shadow-lg px-8 py-6 text-md rounded-xl hover:scale-105 transition-transform"
                >
                  {slide.buttonText}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ))}
      
      {/* স্লাইড নেভিগেশন ডটস */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-blue-500 w-8" : "bg-white/60 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
