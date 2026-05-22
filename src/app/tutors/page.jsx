import TutorCard from "@/components/TutorCard";
import FilterSearchHeader from "@/components/FilterSearchHeader";

export const metadata = {
  title: "Find Expert Instructors",
};

const TutorsPage = async ({ searchParams }) => {
  // 🎯 Next.js 15-এর নিয়ম অনুযায়ী searchParams অবশ্যই await করতে হবে
  const resolvedParams = await searchParams;
  const search = resolvedParams.search || "";
  const startDate = resolvedParams.startDate || "";
  const endDate = resolvedParams.endDate || "";

  // URL কুয়েরি প্যারামিটার তৈরি করা হচ্ছে যা ব্যাকএন্ডে হিট করবে
  const queryParams = new URLSearchParams({ search, startDate, endDate }).toString();

  // ব্যাকএন্ড এপিআই-তে ফিল্টার কিউরি সহ হিট করা হচ্ছে
  const res = await fetch(`http://localhost:5000/api/v1/all-tutors?${queryParams}`, {
    cache: "no-store", 
  });
  
  const tutors = await res.json();

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      
      <div className="text-center mb-8">
        <h1 className="text-3xl font-black text-gray-800 tracking-tight md:text-4xl">All Tutors</h1>
        <p className="text-gray-500 text-sm mt-2 max-w-md mx-auto">
          Explore all our verified instructors across various categories and start learning.
        </p>
      </div>

      {/* সার্চ ও ফিল্টার বার কম্পোনেন্টটি এখানে যুক্ত করা হলো */}
      <FilterSearchHeader />

      {tutors.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
          <p className="text-gray-500 font-medium">No tutors match your search criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {tutors.map((tutor) => (
            <TutorCard key={tutor._id} tutor={tutor} />
          ))}
        </div>
      )}

    </div>
  );
};

export default TutorsPage;

// import TutorCard from "@/components/TutorCard";

// const TutorsPage = async () => {
//   const res = await fetch("http://localhost:5000/api/v1/all-tutors", {
//     cache: "no-store", //sathe sathe page update
//   });
//   const tutors = await res.json();


//   return (
//     <div className="container mx-auto px-4 py-8 max-w-7xl">
    
//       <div className="text-center mb-12">
//         <h1 className="text-3xl font-black text-gray-800 tracking-tight md:text-4xl">All Tutors</h1>
//         <p className="text-gray-500 text-sm mt-2 max-w-md mx-auto">
//           Explore all our verified instructors across various categories and start learning.
//         </p>
//       </div>

//       {tutors.length === 0 ? (
//         <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
//           <p className="text-gray-500 font-medium">No tutors found in the directory right now.</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {tutors.map((tutor) => (
//             <TutorCard key={tutor._id} tutor={tutor} />
//           ))}
//         </div>
//       )}

//     </div>
//   );
// };

// export default TutorsPage;
