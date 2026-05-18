"use client";

import React from "react";
import { Card } from "@heroui/react";

export default function Testimonials() {
  const reviews = [
    {
      text: "Finding a mathematics tutor was never this easy. My grades improved dramatically within just one month of regular online sessions!",
      initial: "R",
      color: "bg-blue-600",
      name: "Rahat Chowdhury",
      role: "HSC Student",
    },
    {
      text: "The scheduling is super flexible. I can learn complex programming languages directly from industry experts at my convenient times.",
      initial: "F",
      color: "bg-indigo-600",
      name: "Fahmida Akhtar",
      role: "University Learner",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-3">What Our Students Say</h2>
        <p className="text-gray-500 max-w-md mx-auto">Real feedback from actual learners across the platform.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((review, index) => (
          <Card key={index} className="p-6 bg-white shadow-sm border border-gray-100 flex flex-col justify-between">
            <p className="text-gray-600 italic leading-relaxed">`{review.text}`</p>
            <div className="mt-6 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full ${review.color} flex items-center justify-center text-white font-bold`}>
                {review.initial}
              </div>
              <div>
                <h5 className="font-semibold text-sm text-gray-800">{review.name}</h5>
                <p className="text-xs text-gray-500">{review.role}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
