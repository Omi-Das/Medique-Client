import AvailableTutors from "@/components/AvailableTutors";
import Banner from "@/components/Banner";
import Testimonials from "@/components/Testimonials";
import WhyChooseUs from "@/components/WhyChooseUs";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Banner/>
      <AvailableTutors/>
      <WhyChooseUs/>
      <Testimonials/>
    </div>
     
  );
}
