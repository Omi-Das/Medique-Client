import LoadingSpinner from "@/components/LoadingSpinner";

export default function MyTutorsLoading() {
  // Next.js triggers this view container directly during async loading cycles
  return <LoadingSpinner label="Loading your personalized tutors list..." />;
}
