import LoadingSpinner from "@/components/LoadingSpinner";

export default function BookedSessionsLoading() {
  // Next.js displays this view component automatically during the data fetch cycle
  return <LoadingSpinner label="Loading your booked academic schedules..." />;
}
