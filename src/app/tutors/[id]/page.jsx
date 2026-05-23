import Image from "next/image";
import BookingModal from "@/components/BookingModal"; // 🎯 Updated global import path

export const metadata = {
  title: "Details Teacher Page",
}

const TutorDetailsPage = async ({ params }) => {
  const { id } = await params;

  const res = await fetch(`http://localhost:5000/api/v1/tutors/${id}`, {
    cache: "no-store", 
  });

  if (!res.ok) {
    return <div className="text-center py-20 text-red-500 font-semibold">Tutor profile not found.</div>;
  }

  const tutor = await res.json();

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <div className="bg-white p-6 md:p-8 border border-gray-100 shadow-sm rounded-xl grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left column Profile Picture */}
        <div className="md:col-span-1">
          <div className="h-64 w-full relative bg-gray-55 rounded-xl overflow-hidden shadow-sm">
            <Image
              alt={tutor.name}
              fill
              className="object-cover"
              src={tutor.photo || "https://unsplash.com"}
              referrerPolicy="no-referrer"
              priority
            />
          </div>
          <div className="mt-4 p-4 bg-cyan-50/50 rounded-xl border border-cyan-100/50 text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-cyan-600">Rate per hour</p>
            <p className="text-3xl font-black text-cyan-700 mt-1">${tutor.hourlyFee}</p>
          </div>
        </div>

        {/* Right column Metadata details */}
        <div className="md:col-span-2 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-3xl font-black text-gray-800">{tutor.name}</h1>
              <span className="text-xs px-2.5 py-1 bg-gray-100 text-gray-600 font-bold rounded-md">{tutor.teachingMode}</span>
            </div>
            
            <p className="text-md text-gray-700 font-semibold">Subject Expertise: <span className="text-cyan-600 font-bold">{tutor.subject}</span></p>
            <hr className="border-gray-100" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">
              <p>🏫 <b>Institution:</b> {tutor.institution}</p>
              <p>💼 <b>Experience:</b> {tutor.experience}</p>
              <p>🗓️ <b>Available Days:</b> {tutor.availableDays}</p>
              <p>🕒 <b>Time Window:</b> {tutor.timeSlot}</p>
              <p>📍 <b>Location:</b> {tutor.location}</p>
              <p>📅 <b>Session Starts:</b> {tutor.startDate}</p>
            </div>

            <div className="pt-2">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                tutor.totalSlot > 0 ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
              }`}>
                {tutor.totalSlot > 0 ? `🟢 Only ${tutor.totalSlot} slots left` : "🔴 No available slots left"}
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100">
            <BookingModal tutor={tutor} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default TutorDetailsPage;
