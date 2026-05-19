import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import BookedSessionsTable from "@/components/BookedSessionsTable";

const MyBookedSessionsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const studentEmail = session.user.email;
  
  const res = await fetch(`http://localhost:5000/api/v1/my-bookings?email=${studentEmail}`, {
    cache: "no-store",
  });

  const initialBookings = await res.json();

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-black text-gray-800">My Booked Sessions</h1>
        <p className="text-gray-500 text-sm mt-1">View and manage all the tutoring sessions you have booked</p>
      </div>

      <BookedSessionsTable initialBookings={Array.isArray(initialBookings) ? initialBookings : []} />
    </div>
  );
};

export default MyBookedSessionsPage;
