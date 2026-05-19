import TutorCard from "@/components/TutorCard";

const TutorsPage = async () => {
  const res = await fetch("http://localhost:5000/api/v1/all-tutors", {
    cache: "no-store", //sathe sathe page update
  });
  const tutors = await res.json();


  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
    
      <div className="text-center mb-12">
        <h1 className="text-3xl font-black text-gray-800 tracking-tight md:text-4xl">All Tutors</h1>
        <p className="text-gray-500 text-sm mt-2 max-w-md mx-auto">
          Explore all our verified instructors across various categories and start learning.
        </p>
      </div>

      {tutors.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
          <p className="text-gray-500 font-medium">No tutors found in the directory right now.</p>
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
