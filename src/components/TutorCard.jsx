import Link from "next/link";
import Image from "next/image";

const TutorCard = ({ tutor }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:scale-[1.01] transition-transform flex flex-col justify-between">
      
     <div className="w-full aspect-[3/3] relative bg-[#e9ebed] block"> 
       <Image
         alt={tutor.name || "Tutor Photo"}
         className="object-cover object-center w-full h-full"
         fill
         sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
         src={tutor.photo && tutor.photo.trim() !== "" && tutor.photo.startsWith("http") ? tutor.photo.trim() : "https://unsplash.com"}
         referrerPolicy="no-referrer"
         priority={true}
       />
     </div>

      <div className="p-5 space-y-3 flex-grow flex flex-col justify-between">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg text-gray-800 tracking-tight">{tutor.name}</h3>
            <span className="text-xs bg-cyan-50 text-cyan-600 px-2.5 py-1 rounded-md font-extrabold">
              ${tutor.hourlyFee}/hr
            </span>
          </div>
          
          <p className="text-sm text-gray-600">
            Subject: <span className="font-semibold text-gray-800">{tutor.subject}</span>
          </p>
          <p className="text-sm text-gray-600">
            Experience: <span className="font-semibold text-gray-800">{tutor.experience}</span>
          </p>
          <p className="text-sm text-gray-600">
            Institution: <span className="font-semibold text-gray-800">{tutor.institution}</span>
          </p>
          <p className="text-xs text-gray-500 flex items-center gap-1">
            📍 {tutor.location} • <span className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded font-medium">{tutor.teachingMode}</span>
          </p>
        </div>
        
        <div className="pt-4">
          <Link href={`/tutors/${tutor._id}`}>
            <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2.5 rounded-lg text-sm transition-colors shadow-md shadow-cyan-50/50">
              Book Session
            </button>
          </Link>
        </div>
      </div>

    </div>
  );
};

export default TutorCard;
