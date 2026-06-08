import TutorCard from "@/components/TutorCard";
import FilterSearchHeader from "@/components/FilterSearchHeader";

export const metadata = {
  title: "All Tutors",
};

const TutorsPage = async ({ searchParams }) => {
  const resolvedParams = await searchParams;
  const search = resolvedParams.search || "";
  const startDate = resolvedParams.startDate || "";
  const endDate = resolvedParams.endDate || "";

  const queryParams = new URLSearchParams({ search, startDate, endDate }).toString();
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/all-tutors?${queryParams}`, {
    cache: "no-store",
 });
  
  const tutors = await res.json();

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      
      <div className="text-center mb-8">
        <h1 className="text-3xl font-black text-gray-800 dark:text-white tracking-tight md:text-4xl">All Tutors</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 max-w-md mx-auto">
          Explore all our verified instructors across various categories and start learning.
        </p>
      </div>

      <FilterSearchHeader />

      {tutors.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-900 rounded-xl border border-dashed border-gray-200 dark:border-gray-800">
          <p className="text-gray-500 dark:text-gray-400 font-medium">No tutors match your search criteria.</p>
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
