import AvailableTutors from "@/components/AvailableTutors";
import Banner from "@/components/Banner";
import Testimonials from "@/components/Testimonials";
import WhyChooseUs from "@/components/WhyChooseUs";
import Image from "next/image";

export default function Home() {
  return (
        <div className="space-y-20 pb-12">
      <Banner />
    
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Available Tutors</h2>
          <p className="text-gray-500">Book a session with our top-rated teachers today</p>
        </div>
        
        <AvailableTutors />
      </section>

      <WhyChooseUs />

      <Testimonials />
    </div>
     
  );
}
