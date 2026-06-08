"use client";

import { useState, useEffect } from "react";
import { Button } from "@heroui/react";
import Link from "next/link";
import Image from "next/image";

export default function Banner() {
  const slides = [
    {
      id: 1,
      title: "Find the Perfect Expert Tutor for Your Journey",
      desc: "Connect with top verified teachers worldwide and master any subject easily through live interactive sessions.",
      image: "/hero-bg.png",
      buttonText: "Explore All Tutors"
    },
    {
      id: 2,
      title: "Learn at Your Own Pace, Anywhere, Anytime",
      desc: "Get customized and flexible study schedules tailored exclusively to your personal academic needs and speed.",
      image: "/stocksave.jpg",
      buttonText: "Find Your Tutor"
    },
    {
      id: 3,
      title: "Boost Your Professional Skills & Academic Goals",
      desc: "Join thousands of successful learners who have already unlocked their potential and reached their dreams.",
      image: "/pictange.jpg",
      buttonText: "Get Started Now"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative w-full h-[480px] overflow-hidden rounded-2xl shadow-xl bg-gray-900">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 flex flex-col justify-center items-center text-center px-6 transition-all duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100 scale-100 z-10" : "opacity-0 scale-95 z-0 pointer-events-none"
          }`}
        >
          <Image
            alt={slide.title}
            src={slide.image}
            fill
            priority={true}
            sizes="100vw"
            className="object-cover object-center z-0"
          />

          <div className="absolute inset-0 bg-black/60 z-10 rounded-2xl" />

          <div className="relative z-20 max-w-3xl space-y-4">
            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight drop-shadow-md">
              {slide.title}
            </h1>
            <p className="text-gray-200 text-base md:text-xl max-w-xl mx-auto font-light leading-relaxed">
              {slide.desc}
            </p>
            
            <div className="pt-4">
              <Link href="/tutors">
                <Button 
                  size="lg" 
                  className="font-bold bg-cyan-500 hover:bg-cyan-600 text-white shadow-lg px-8 py-6 text-md rounded-xl hover:scale-105 transition-transform"
                >
                  {slide.buttonText}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ))}
      
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-cyan-500 w-8" : "bg-white/60 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
