"use client";

import React from "react";

export default function WhyChooseUs() {
  const features = [
    {
      icon: "🎓",
      title: "Verified Experts",
      desc: "All tutors undergo a strict profile verification process before teaching.",
    },
    {
      icon: "🔒",
      title: "Safe & Secure",
      desc: "Your data and bookings are fully protected with our security standards.",
    },
    {
      icon: "📈",
      title: "Track Progress",
      desc: "Monitor your learning curve and dynamic session reports easily.",
    },
  ];

  return (
    <section className="bg-gray-50 py-16 rounded-2xl max-w-7xl mx-auto px-6 shadow-sm border border-gray-100">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-3">Why Choose Our Platform?</h2>
        <p className="text-gray-500 max-w-md mx-auto">We ensure the highest quality learning experience for every single student.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow text-center space-y-3">
            <div className="text-4xl">{feature.icon}</div>
            <h4 className="text-xl font-semibold text-gray-800">{feature.title}</h4>
            <p className="text-sm text-gray-600 leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
